require "sinatra/activerecord"
require "sinatra"
require "json"

@@database = ENV["POSTGRES_URI"] || ENV["POSTGRESQL_URI"] || "postgres://localhost:5432/tool_repo"
set :database, @@database
set :public_folder, "public"

@@instance_id = SecureRandom.uuid
@@start_time = Time.new
@@host = "localhost"

# ActiveRecord models
class ToolList < ActiveRecord::Base
end
# DB configuration
configure do
	if database.connected?
		unless database.connection.table_exists?("tool_lists")
		    database.connection.create_table :tool_lists do |t|
		      t.string :name, :null => false
		      t.string :description
		      t.string :tool_type 
		    end
			ToolList.new(:name=>"60 1/2 Low Angle Block Plane", :tool_type=>"surfacing", 
				:description=>"small hand tool for chamfers and detailed surfacing").save
		  end
	end
end

# specify json as default content_type
before do
	@@host = request.host
  content_type "application/json"
end

# return a random identifier of the application instance
get "/id" do 
	puts @@instance_id.to_json
	puts @@start_time
	[200, {"instance_id"=>@@instance_id, 
		"start_time"=>@@start_time,
		"hostname"=>@@host}.to_json]
end

# return the connection information
get "/conn_info" do
	db = URI.parse(@@database)
	puts db.to_json
	db.to_json
end

get "/conn_status" do
	# puts settings.server.methods - Object.instance_methods-Object.methods
	if !database.connected?
		return [200, {"status"=>false,
		"bound"=>false}.to_json]
	end
	return [200, {"status"=>true,
		"bound"=>true}.to_json] 
end

get "/sql/readall" do
	if database.connected?
		res = ToolList.count(:all);
		puts res
		return {"count"=>res}.to_json
	end
	return {"count"=>0}.to_json
end

get "/sql/add" do
	begin
	ToolList.new(:name=>"60 1/2 Low Angle Block Plane", :tool_type=>"surfacing", 
		:description=>"small hand tool for chamfers and detailed surfacing").save
	return [200, {"status"=>"ok"}.to_json]
	rescue Exception=> e
		return [400, {"error"=>"Can't add", 
			"description"=>e.message}.to_json]
	end
end

# gotta clean this up.
get "/sql/deletefirst" do
	begin
		res = ToolList.first;
		if res != nil
			res.destroy;
			return [200,{"description"=>"deleted"}.to_json]
		end
		return [400,{"description"=>"No records to delete"}.to_json]
	rescue Exception => e
		return [400, {"error"=>"Can't delete", 
			"description"=>e.message}.to_json]
	end
	return [400,{"description"=>"Can't delete"}.to_json]
end

# accept username and password from URI, attempt to connect to database
get "/conn_info/:user/:passwd" do
	conn_string = URI.parse(@@database)
	host = conn_string.host
	port = conn_string.port
	path = conn_string.path
	new_conn_string = 
		"postgres://#{params[:user]}:#{params[:passwd]}@#{host}:#{port}#{path}"

	# update the settings object
	settings.database = new_conn_string
	# attempt to add a new record to the database
	begin
		tool = ToolList.first;
	rescue PG::ConnectionBad => e
		return [401, {"error"=>"Bad credentials", 
			"description"=>e.message.chomp,
			"new_conn_string"=>new_conn_string}.to_json]
	ensure
		settings.database = @@database
	end
	# shouldn't happen!
	return [200, {"description"=>"Credentials worked!",
		"new_conn_string"=>new_conn_string}.to_json]
end

# return the environment
get "/network" do
	network = `/sbin/ifconfig`
	netstat = `netstat -lp`
	proc = `ps -A -F --forest`
	return {"Network"=>network, "Netstat"=>netstat, "Process"=>proc}.to_json
end

# return the environment
get "/env" do
	ENV.to_hash.to_json
end

# return the value of a particular environment variable
get "/env/:name" do
	if ENV[params[:name].upcase]
		ENV[params[:name].upcase].to_json
	else
		[404]	
	end
end

get "/" do
	redirect to('/index.html')
end

# commit Harikari on command.
get "/quitquitquit" do
	puts "Houston, you told us to do it! Goodbye!"
	Process.kill("SIGABRT", Process.pid)
end



