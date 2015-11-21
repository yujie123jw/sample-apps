require 'rails_helper'

describe Location do
  it "should default to being empty" do
    expect(Location.count).to eq(0)
  end

  it "should seed data" do
    Location.seed
    expect(Location.count).to eq(10)
  end

  it "should clear data" do
    Location.seed
    expect(Location.count).to eq(10)
    Location.clear
    expect(Location.count).to eq(0)
  end
end
