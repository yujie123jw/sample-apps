class TrainsController < ApplicationController
  MAX_RETRIES = 5

  def index
    retries = 1

    while retries <= MAX_RETRIES
      begin
        @trains = fetch_trains

        # Make sure we got a hash back from the trains endpoint.
        next unless @trains.is_a?(Hash)

        # Break the loop if the fetch is successful.
        logger.info "BART Response: #{@trains.inspect}"
        break
      rescue
        retries += 1

        # Wait a moment before attempting to get train schedule again.
        sleep 1
      end
    end
  end

  private

  def fetch_trains
    HTTParty.get "http://api.bart.gov/api/etd.aspx",
      :query => { :cmd => "etd", :orig => "mont", :key => ENV['BART_KEY']}
  end
end
