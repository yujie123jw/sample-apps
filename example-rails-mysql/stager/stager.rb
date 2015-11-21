#!/usr/bin/env ruby

# Simple rails stager using unicorn.
# An example of how to use the stager-api-ruby.
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
puts "Adding dependencies"
should_restart = false

if stager.dependencies_add("runtime", "ruby")
  should_restart = true
end

# Need build tools
if stager.dependencies_add("package", "build-essential")
  should_restart = true
end

if should_restart == true
  stager.relaunch
end

# Download the package from the staging coordinator.
puts "Downloading Package..."
stager.download

# Extract the package to the "app" directory.
puts "Extracting Package..."
stager.extract("app")

# Run bundler for my app in the extracted directory.
puts "Running Bundler..."
stager.execute_app("bundle install --path vendor/bundle --binstubs vendor/bundle/bin --deployment")
stager.execute("find #{stager.app_path} -type d -exec chmod 755 {} +")

# Setup database.yml. Scheme must be mysql2 to use the mysql2 adapter.
puts "Setting up database.yml"
dbyml = %^# Simple database.yml to connect to mysql binding
production:
  url: <%= ENV['MYSQL_URI'].sub('mysql://', 'mysql2://') %>
development:
  url: <%= ENV['MYSQL_URI'].sub('mysql://', 'mysql2://') %>
test:
  url: <%= ENV['MYSQL_URI'].sub('mysql://', 'mysql2://') %>
^
File.open(File.join(stager.app_path, 'config', 'database.yml'), 'w') { |file| file.write(dbyml) }

# Setup test DB
puts "Setting Up Test DB..."
stager.execute_app("bash -c 'RUBYOPT=W0 RAILS_ENV=test bundle exec rake db:migrate'")

# Run tests
puts "Running Tests..."
stager.execute_app("bash -c 'export RUBYOPT=W0;RAILS_ENV=test bundle exec rake spec'")

# Set the start command.
start_cmd = "bundle exec unicorn -p $PORT"
puts "Setting start command to '#{start_cmd}'"
stager.start_command = start_cmd

# Set the start path.
start_path = "/app"
puts "Setting start path to '#{start_path}'"
stager.start_path = start_path

# Make sure we're running in production mode.
puts "Setting RAILS_ENV to production"
stager.environment_add("RAILS_ENV", "production")

# Finish staging, this will upload your final package to the
# staging coordinator.
puts "Completed Staging..."
stager.complete
