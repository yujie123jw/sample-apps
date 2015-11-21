class Location < ActiveRecord::Base
  validate :city, :presence => true
  validate :state, :presence => true

  def self.seed
    seed_data = [ {city: "New York", state: "NY"},
      {city: "Los Angeles", state: "CA"},
      {city: "San Francisco", state: "CA"},
      {city: "Seattle", state: "WA"},
      {city: "Chicago", state: "IL"},
      {city: "Miami", state: "FL"},
      {city: "Denver", state: "CO"},
      {city: "Dallas", state: "TX"},
      {city: "Irvine", state: "CA"},
      {city: "Santa Fe", state: "NM"} ]

    # populate the db.
    seed_data.each do |l|
      Location.find_or_create_by(city: l[:city], state: l[:state])
    end
  end

  def self.clear
    Location.delete_all
  end
end
