class MainController < ApplicationController
  def index
    HardWorker.perform_async('josh')
    render :index
  end
end
