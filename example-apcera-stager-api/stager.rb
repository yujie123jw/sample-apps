#!/usr/bin/env ruby

# Simple sinatra stager.
# An example of how to use the apcera-stager-api.
# The API is located at: https://github.com/apcera/stager-api-ruby

require "bundler"
Bundler.setup

# Bring in apcera-stager-api
require "apcera-stager-api"

# Make sure stdout is sync'd.
STDOUT.sync = true

stager = Apcera::Stager.new

# Add the ruby dependency we need to stage our app. If it was added
# then restart the stager, otherwise we already have it.
puts "Adding ruby dependency"
should_restart = stager.dependencies_add("runtime", "ruby")
if should_restart == true
  stager.relaunch
end

# Set the start command.
start_cmd = "bundle exec rackup config.ru -p $PORT"
puts "Setting start command to '#{start_cmd}'"
stager.start_command = start_cmd

# Set the start path.
start_path = "/app"
puts "Setting start path to '#{start_path}'"
stager.start_path = start_path

# Make sure we're running in production mode.
puts "Setting RACK_ENV to production"
stager.environment_add("RACK_ENV", "production")

# Download the package from the staging coordinator.
puts "Downloading Package..."
stager.download

# Extract the package to the "app" directory.
puts "Extracting Package..."
stager.extract("app")

# Run bundler for my app in the extracted directory.
puts "Running Bundler..."
stager.execute_app("bundle install --without development:test --path vendor/bundle --binstubs vendor/bundle/bin --deployment")

# Finish staging, this will upload your final package to the
# staging coordinator.
puts "Completed Staging..."
stager.complete
