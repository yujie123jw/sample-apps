require 'sinatra'
require 'net/http'

get '/' do
  uri = ENV['GLUE_URI']
  begin
    Net::HTTP.get(URI(uri))
  rescue Exception => e
    "#{e.class}: #{e.message} when attempting to GET from #{uri}"
  end
end
