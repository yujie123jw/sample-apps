#!/usr/bin/env ruby

require "bundler"
Bundler.setup

# Bring in apcera-stager-api
require "apcera-stager-api"

STDOUT.sync = true
stager = Apcera::Stager.new

# Add the meteor dependency we need to stage our app. If it was added
# then restart the stager, otherwise we already have it.
puts "Adding meteor and node dependencies..."
should_restart_meteor = stager.dependencies_add("runtime", "meteor")

# This is a bit brittle. New versions of node will require an update to
# this package reference.
should_restart_node = stager.dependencies_add("runtime", "node-0.10.40")
if should_restart_node == true || should_restart_meteor == true
  stager.relaunch
end

# Set the start command.
start_cmd = "node main.js"
puts "Setting start command to '#{start_cmd}'"
stager.start_command = start_cmd

# Set the start path.
start_path = "/app"
puts "Setting start path to '#{start_path}'"
stager.start_path = start_path

# Download the package from the staging coordinator.
puts "Downloading package..."
stager.download

# Extract the package to the "app" directory.
puts "Extracting package..."
stager.extract("app")

# Make sure ENV vars for meteor commands are set correctly
meteor_env = "HOME=/stagerfs PATH=/stagerfs/.meteor:$PATH"

# Setup meteor for linux and install dependencies with npm
puts "Setting up build directories..."
stager.execute("sudo mkdir -p /stagerfs/app")
stager.execute("sudo chown root:runner /stagerfs/app")
stager.execute("sudo chmod 775 /stagerfs/app")

# NOTE: this actually creates a bundle directory in the app dir specified.
puts "Setting up meteor for linux...."
stager.execute_app("#{meteor_env} meteor build --directory /stagerfs/app --architecture os.linux.x86_64")

puts "Setting up chroot environment in /stagerfs"
stager.setup_chroot

puts "Installing npm dependencies..."
stager.execute(%^sudo chroot --userspec=runner:runner /stagerfs bash -c "cd /app/bundle/programs/server && sudo /opt/apcera/node-0.10.*/bin/npm install --production"^)

puts "Updating ENV variables so node dependencies can be found..."
stager.environment_add("PATH", "/app/bin:/app/programs/server/node_modules/.bin:$PATH")

puts "Moving built application to /app..."
stager.execute("sudo rm -rf /app/*")
stager.execute("sudo chmod 775 /app")
stager.execute("sudo chown root:runner /app")
stager.execute_app("sudo cp -rf /stagerfs/app/bundle/* .")
stager.execute_app("sudo rm -rf /stagerfs/app/bundle")

# Finish staging, this will upload your final package to the
# staging coordinator.
puts "Completed staging..."
stager.complete
