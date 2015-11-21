#!/usr/bin/env ruby

# Setup bundler and require needed gems.
require "bundler"
Bundler.setup
require "rest-client"
require "digest/sha1"
require "json"

# Temp dir to build new app in.
NEW_APP_DIR = "td-agent-site"

# Name of the start script to create.
START_SCRIPT = "start_app_with_td_agent.sh"

# Get the stager url from the environment.
STAGER_URL = ENV["STAGER_URL"]

# Helper command to run a command, stream the output to stdout, and also capture
# if the command exited non-zero. This is very similar to 'set -e' in bash.
def exe(cmd)
  result = system(cmd)
  if !result
    RestClient.post(STAGER_URL+"/failed", {})
    exit 1
  end
end

def setup_start_script(start_command)
  if start_command == ""
    start_command = 'echo "No start command found."'
  end

  # Write a small start script in bash that starts td-agent and fires up the app.
  File.open(START_SCRIPT, "wb") do |f|
    f.write <<-EOS
#!/bin/bash

# Start td-agent from init.d
echo "Starting td-agent via runit"
sudo mkdir -p /var/log/td-agent/buffer
sudo /command/runsv /etc/sv/td-agent &

# Start the app.
echo "Starting application"
#{start_command}
EOS
  end

  # Make sure new start script is executable.
  exe("chmod 755 #{START_SCRIPT}")
end

# Start begin/rescue block so we can report success/failed.
begin
  # Download the package.
  response = RestClient.get(STAGER_URL+"/data")
  File.open("pkg.tar.gz", "wb") do |f|
    f.write(response.to_str)
  end

  # Create our working directory.
  Dir.mkdir(NEW_APP_DIR) unless Dir.exists?(NEW_APP_DIR)

  Dir.chdir(NEW_APP_DIR) do |apppath|
    # Decompress the package. Then delete the archive. We will be creating a new one.
    exe("tar -zxf ../pkg.tar.gz")
    exe("rm ../pkg.tar.gz")

    # Get start command from the package metadata
    response = RestClient.get(STAGER_URL+"/meta")
    parsed_response = JSON.parse(response)
    start_command = parsed_response["environment"]["START_COMMAND"]
    start_path = parsed_response["environment"]["START_PATH"]

    # Move to the start path directory if there is one, we need to write a new start script.
    if start_path != ""
      # Make sure leading / is removed from the START_PATH, we are staged in
      # /stagerfs so the chdir fails if we don't.
      Dir.chdir(start_path.sub(/^[\/]/, "")) do
        setup_start_script(start_command)
      end
    else
      setup_start_script(start_command)
    end

    # Recompress the app for uplaoding to the staging coordinator.
    exe("tar czf ../pkg.tar.gz app")
  end

  # Add td-agent as a dependency.
  response = RestClient.put(STAGER_URL+"/meta", {"resource" => "dependencies", "action" => "add", "type" => "package", "name" => "td-agent"})
  if response != "OK"
    raise "Unable to add td-agent depedency."
  end

  # Set a new start command to include td-agent.
  response = RestClient.put(STAGER_URL+"/meta", {"resource" => "environment", "action" => "add", "key" => "START_COMMAND", "value" => "./#{START_SCRIPT}"})
  if response != "OK"
    raise "Unable to update the application's start command."
  end

  # Upload the package to the staging coordinator.
  sha1 = Digest::SHA1.file("pkg.tar.gz")
  File.open("pkg.tar.gz", "rb") do |f|
    response = RestClient.post(STAGER_URL+"/data?sha1=#{sha1.to_s}", f.read, { :content_type => "application/octet-stream" })
    if response != "OK"
      raise "Unable to update package."
    end
  end

  # Ensure the upload was successful.
  if response.code == 200
    RestClient.post(STAGER_URL+"/done", {})
    exit 0
  else
    # Failed to upload, error out.
    RestClient.post(STAGER_URL+"/failed", {})
    exit 1
  end
rescue => e
  puts "ERROR: #{e}"
  RestClient.post(STAGER_URL+"/failed", {})
  exit 1
end
