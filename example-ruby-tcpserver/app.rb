require "securerandom"
require "socket"

# get the port and validate it
port = ENV["PORT"].to_i
raise "PORT was not set or was set to 0, please set a real port!" if port == 0
puts "Ruby TCP server port set to: #{port}"

# create the server on the port set via the environment
server = TCPServer.new(port)
puts "Server is running."

# loop
loop do
  begin
    # wait for a connection
    client = server.accept

    # get our random text, or just generate some ourself
    random_text = ENV["RANDOM_TEXT"] || SecureRandom.hex(50)

    # write our text then close
    client.puts random_text
    puts "Served random text: #{random_text}"

    client.close
  rescue
  end
end
