require "sinatra"
require "uri"
require 'mongo'
require 'json/ext' 

class App < Sinatra::Base

  configure do
    begin
      u = URI.parse(ENV["TOKUMX_URI"] || ENV["MONGODB_URI"] || ENV["MONGO_URI"])

      # Parse the uri and just pass in the hostname and port
      db = Mongo::Client.new([ "#{u.hostname}:#{u.port}" ], :database => 'test', collection: 'test_coll')
    rescue Exception => e
      # In case you need to run app it locally, here is a hint. 
      # TOKUMX_URI should be set to where your mongodb is running/listening
      if e.backtrace.join.include?('parse_host_port')
        raise e.message + "!!! Try adding TOKUMX_URI=127.0.0.1:27017 to your app start command if you are testing the app on your local environment"
      else
        raise e 
      end
    end 
    set :mongo_db, db[:test_coll]
  end

  get "/" do
    <<-HTML
<html>
  <p>Hello, TokuMx-Mongo!</p>
  <p>Adding paths to your url will do following:</p>
  <p>/test_coll/ <b>- Get collection name</b></p>
  <p>/test_coll/all/ <b>- Get all records in collection</b></p>
  <p>/test_coll/find/:key/:value/ <b>- Get records with @params</b></p>
  <p>/test_coll/count/:key/:value/ <b>- Ger number of records with @params</b></p>
  <p>/test_coll/set/:key/:value/ <b>- Insert record in collection with @params</b></p>
  <p>/test_coll/delete/ <b>- Delete everything from collection</b></p>
</html>
    HTML
  end

  # Get collection name 
  get '/test_coll/?' do
    puts "Retrieving Collections"
    content_type :json
    settings.mongo_db.name.to_json
  end

  # Get all records in collection 
  get '/test_coll/all/?' do
    settings.mongo_db.find().to_a.to_json
  end 

  # Get records with @params
  get '/test_coll/find/:key/:value/?' do |key, value|
    puts "Retrieving record(s) for #{key}: #{value}"
    content_type :json
    settings.mongo_db.find(key.to_sym => value).to_a.to_json
  end

  # Ger number of records with @params
  get '/test_coll/count/:key/:value/?' do |key, value|
    settings.mongo_db.find(key.to_sym => value).count.to_json
  end

  # Delete everything from collection
  get '/test_coll/delete/?' do
    settings.mongo_db.drop
  end

  # Insert record in collection with @params
  get "/test_coll/set/:key/:value/?" do |key, value|
    puts "Setting #{value} for #{key} in test_coll"
    content_type :json
    db = settings.mongo_db
    result = db.insert_one({ key.to_sym => value })
    db.find(:_id => result.inserted_id).to_a.first.to_json
  end

end
