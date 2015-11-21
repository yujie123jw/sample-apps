class HardWorker
  include Sidekiq::Worker

  def perform(name)
    puts 'Doing hard work'
  end
end
