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

  get "/template" do
    %q(
scalars:<br>
uuid: {{uuid}}<br>
name: {{name}}<br>
num_instances: {{num_instances}}<br>
cpu: {{cpu}}<br>
memory: {{memory}}<br>
disk: {{disk}}<br>
port: {{port}}<br>
<br>
env_map:<br>
{{range $key, $val := env_map}}
  {{$key}}={{$val}}<br>
{{end}}<br>
tags:<br>
{{range tags}}
  {{.Name}}: {{.Value}}<br>
{{end}}
<br>
routes:<br>
{{range routes}}
  URL: {{.URL}}<br>
{{if .Public}}
  Port: {{.ListenPort}}<br>
{{else}}
  UpdatePort: {{.ListenPort}}<br>
{{end}}
{{end}}
<br>
bindings:<br>
{{range bindings}}
  Name: {{.Name}}<br>
  Provider: {{.Provider}}<br>
  Service: {{.Service}}<br>
  URI: {{.URI}}<br>
    scheme={{.URI.Scheme}}<br>
    user={{.URI.User}}<br>
    password={{.URI.Password}}<br>
    host={{.URI.Host}}<br>
    port={{.URI.Port}}<br>
    path={{.URI.Path}}<br>
    raw_query={{.URI.RawQuery}}<br>
{{end}}
)
  end
end
