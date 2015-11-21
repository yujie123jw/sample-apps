# Add the root to the load path.
$LOAD_PATH << File.join(File.dirname(__FILE__), "..")

# Set RACK_ENV to test
ENV["RACK_ENV"] = "test"

# require items needed for testing
require "app"
require "rack/test"

RSpec.configure do |config|
  config.include Rack::Test::Methods
end
