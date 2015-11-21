require "redis"
require "sinatra"
require "uri"

class App < Sinatra::Base
  configure do
    set :redis, Redis.new(:url => ENV["REDIS_URI"])
  end

  get "/" do
    <<-HTML
<html>
  <p>Hello, Redis!</p>
  <form method="post" action="/set">
      Set <input name="key" placeholder="key" required>
        = <input name="value" placeholder="value" required>
      <input type="submit" value="Set">
  </form>
</html>
    HTML
  end

  get "/get/:key" do |key|
    puts "Retrieving value for #{key}"
  	settings.redis.get(key) # result goes to user
  end

  post "/set/:key/:value" do |key, value|
    puts "Setting value #{key} = #{value}"
    settings.redis.set(key, value) # result goes to user
  end

  post "/set" do
    key = request["key"]
    value = request["value"]
    puts "Setting value #{key} = #{value}"
    settings.redis.set(key, value) # result goes to user
  end


  error do
    err = env['sinatra.error']
    if err
      "Encountered an error: #{err.class.name}" # goes to user
    end
  end
end
