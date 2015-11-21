# Require dependencies.
# sinatra - lightweight web framework
# json - for JSON marshalling.
require 'sinatra'
require 'json'
require 'securerandom'
require 'uri'

# Setup const for json content type.
JSON_CONTENT_TYPE = 'application/json'

# Methods needed for / endpoint.
# This tells the API server what endpoints are available
# to the SG.
REGISTERED_METHODS = {
  '/services' => {
   'GET'     => [{}],
   'POST'    =>  {}
   },
  '/services/:id' => {
    'GET'    =>  {'params' => {'url' => 'postgres://username:password@url:port/db'}},
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
@@services = []
@@bindings = []

# Create a service for a single redis db 0 - 12.
post '/services' do
  content_type JSON_CONTENT_TYPE
  data = JSON.parse(request.body.read)
  # Return an existing service if the db id requested is a duplicate.
  if data['params'] && data['params']['url']
    if service = @@services.detect {|s| s['params']['url'] && (s['params']['url'] == data['params']['url'])}
      return service.to_json
    end
  end

  url = data['params']['url']

  # Build new service object.
  service = { }
  service['id']           = SecureRandom.uuid
  service['name']         = "Heroku Postgres - #{url}"
  service['description']  = "Heroku Postgres DB"
  service['params']       = { 'url' => url }
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
  service.to_json
end

# Create a binding.
post '/bindings' do
  content_type JSON_CONTENT_TYPE
  data = JSON.parse(request.body.read)
  service = @@services.detect {|service| service['id'] == data['service_id'] }
  halt 404 unless service

  uri = URI.parse(service['params']['url'])
  uri.user = "foo"
  uri.password = "foo"

  template_uri = uri.to_s.sub("foo:foo", "{{alphanum 16}}:{{alphanum 16}}")

  binding = {
    'id'              => SecureRandom.uuid,
    'name'            => "heroku-postgres-binding-#{service['params']['url']}",
    'service_id'      => service['id'],
    'url'             => "#{service['params']['url']}",
    'url_template'    => template_uri,
    'URLTemplate'     => template_uri,
    'protocol'        => {'scheme' => 'postgres'}
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