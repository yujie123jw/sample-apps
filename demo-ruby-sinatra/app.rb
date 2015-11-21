require "sinatra"
require "cgi"
require "erb"

class App < Sinatra::Base
  get "/" do
    erb :index
  end

  get "/db" do
    erb :db
  end

  get "/status/heartbeat" do
    "Alive"
  end
end
