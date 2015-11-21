#!/usr/bin/env ruby

require "bundler"
Bundler.setup

require "apcera-stager-api"

stager = Apcera::Stager.new

# littleBits Authorization token. This is available after signing up for a littleBits account.
LITTLEBITS_AUTH = "YOUR_API_KEY"

# littleBits device. You can get a list of devices at:
# api-http.littlebitscloud.cc/devices
DEVICE = "00e04c02c518"

# Output duration in ms.
OUTPUT_DURATION = "3000"

stager.output "Contacting littleBits..."

# Send output call to the API. Feel free to update this for other API calls.
`curl -i -XPOST -H "Authorization: Bearer #{LITTLEBITS_AUTH}" api-http.littlebitscloud.cc/devices/#{DEVICE}/output -d duration_ms=#{OUTPUT_DURATION} > /dev/null 2>&1`

stager.output "Deploy successful!"
stager.complete
