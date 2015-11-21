require "dalli"
require "sinatra"
require "uri"

class App < Sinatra::Base
  helpers do
    def dalli
      uri = URI(ENV["MEMCACHE_URI"])
      Dalli::Client.new("#{uri.host}:#{uri.port}")
    end
  end

  get "/" do
    "Hello, World!"
  end

  get "/get/:key" do |key|
    dalli.get(key)
  end

  get "/set/:key/:value" do |key,value|
    dalli.set(key, value)
    "OK"
  end
end
