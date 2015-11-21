# Require dependencies.
# sinatra - lightweight web framework
# json - for JSON marshalling.
require 'sinatra'
require 'json'
require 'securerandom'

# Setup const for json content type.
JSON_CONTENT_TYPE = 'application/json'

# Methods needed for / endpoint.
# This tells the API server what endpoints are available
# to the SG.
REGISTERED_METHODS = {
  '/providers' => {
    'GET'    =>  [{}],
    'POST'   =>  {'params' => {'url' => 'redis://example.redis.com:6379'}}
  },
  '/providers/:id' => {
    'GET'    =>  {'params' => {'url' => 'redis://example.redis.com:6379'}},
    'DELETE' =>  {}
  },
  '/services' => {
   'GET'     => [{}],
   'POST'    =>  {}
   },
  '/services/:id' => {
    'GET'    =>  {'params' => {'db' => '0'}},
    'DELETE' =>  {}
  },
  '/bindings' => {
    'GET'    => [{}],
    'POST'   =>  {}
  },
  '/bindings/:id' => {
    'GET'    =>  {},
    'DELETE' =>  {}
    },
}

# Place the API server checks for methods that are supported.
get '/' do
  content_type JSON_CONTENT_TYPE
  REGISTERED_METHODS.to_json
end

# No persistent data store, just build up some arrays and class vars.
@@providers = []
@@services = []
@@bindings = []

# Create a provider
post '/providers' do
  content_type JSON_CONTENT_TYPE
  data = JSON.parse(request.body.read)
  uri = URI(data['params']['url'])
  hostname = uri.hostname
  provider = {}
  provider['id']           = SecureRandom.uuid
  provider['name']         = "redis-server-#{hostname}"
  provider['description']  = "Redis Server at #{hostname}"
  provider['params']       = data['params']
  provider['type']         = 'redis'
  @@providers << provider
  provider.to_json
end

# List providers.
get '/providers/?' do
  content_type JSON_CONTENT_TYPE
  @@providers.to_json
end

# Get a provider.
get '/providers/:id' do
  content_type JSON_CONTENT_TYPE
  provider = @@providers.detect { |p| p['id'] == params['id'] }
  halt 404 unless provider
  provider.to_json
end

# Remove a provider.
delete '/providers/:id' do
  content_type JSON_CONTENT_TYPE
  provider = @@providers.detect {|provider| provider['id'] == params['id'] }
  halt 404 unless provider
  @@providers.delete_if {|p| p['id'] == provider['id'] }
  provider.to_json
end

# Track dbs we have services for.
@@redis_dbs = []
(0...100).each do |db|
  @@redis_dbs << {:used => false, :db => db }
end

# Create a service for a single redis db 0 - 12.
post '/services' do
  content_type JSON_CONTENT_TYPE
  data = JSON.parse(request.body.read)
  # Return an existing service if the db id requested is a duplicate.
  if data['params'] && data['params']['db']
    if service = @@services.detect {|s| s['params']['db'] && (s['params']['db'].to_i == data['params']['db'].to_i)}
      return service.to_json
    end
  end
  provider = @@providers.detect {|p| p['id'] == data['provider_id']}
  halt 404 unless provider
  uri = URI(provider['params']['url'])
  hostname = uri.hostname

  # Check to see if db requested is in use, or find a db that is unused if none was provided.
  db = nil
  if db_id = data['params'] && data['params']['db']
    db = @@redis_dbs.detect { |rdb| rdb[:db].to_i == db_id.to_i }
  else
    db = @@redis_dbs.detect { |rdb| rdb[:used] == false }
  end
  halt 404 unless db  # return 404 in case there is no redis db available

  # Build new service object.
  service = { }
  service['id']           = SecureRandom.uuid
  service['name']         = "redis-db-#{db[:db]}"
  service['description']  = "Redis DB at #{hostname}/#{db[:db]}"
  service['provider_id']  = provider['id']
  service['params']       = { 'db' => db[:db] }
  db[:used] = true
  @@services << service
  service.to_json
end

# Get a list of services.
get '/services/?' do
  content_type JSON_CONTENT_TYPE
  @@services.to_json
end

# Get a specific service.
get '/services/:id' do
  content_type JSON_CONTENT_TYPE
  service = @@services.detect {|service| service['id'].to_s == params['id'] }
  halt 404 unless service
  service.to_json
end

# Remove a service.
delete '/services/:id' do
  content_type JSON_CONTENT_TYPE
  service = @@services.detect {|service| service['id'] == params['id'] }
  halt 404 unless service
  @@services.delete_if {|s| s['id'] == service['id'] }
  db = @@redis_dbs.detect {|rdb| rdb[:db].to_i == service['params']['db'].to_i }
  db[:used] = false
  service.to_json
end

# Create a binding.
post '/bindings' do
  content_type JSON_CONTENT_TYPE
  data = JSON.parse(request.body.read)
  service = @@services.detect {|service| service['id'] == data['service_id'] }
  halt 404 unless service
  provider = @@providers.detect{|provider| provider['id'] == service['provider_id']}
  halt 404 unless provider
  binding = {
    'id'              => SecureRandom.uuid,
    'name'            => "redis-binding-to-#{service['name']}",
    'service_id'      => service['id'],
    'url'             => "#{provider['params']['url']}/#{service['params']['db']}",
    'protocol'        => { 'scheme' => 'redis'}
  }
  @@bindings << binding
  binding.to_json
end

# Get list of bindings.
get '/bindings/?' do
  content_type JSON_CONTENT_TYPE
  @@bindings.to_json
end

# Get one binding.
get '/bindings/:id' do
  content_type JSON_CONTENT_TYPE
  binding = @@bindings.detect {|b| b['id'] == params['id'] }
  halt 404 unless binding
  binding.to_json
end

# Delete a binding.
delete '/bindings/:id' do
  content_type JSON_CONTENT_TYPE
  binding = @@bindings.detect {|b| b['id'] == params['id'] }
  halt 404 unless binding
  @@bindings.delete_if {|b| b['id'] == binding['id'] }
  binding.to_json
end