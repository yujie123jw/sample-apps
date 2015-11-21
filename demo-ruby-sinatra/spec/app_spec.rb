require "spec_helper"

describe App do
  include Rack::Test::Methods

  def app
    App
  end

  describe "heartbeat" do
    it "should return 'Alive'" do
      get "/status/heartbeat"
      last_response.ok?.should be_true
      last_response.body.should == "Alive"
    end
  end

  describe "db" do
    before do
      get "/db"
    end
 
    it "should return ok" do
      last_response.ok?.should be_true
    end

    it "should mention Sinatra Sample" do
      last_response.body.should =~ /Sinatra Sample/
    end
  end
end
