class MainController < ApplicationController
  def index
    def index
      @locations = Location.all
    end

    def seed
      Location.seed
      redirect_to :root
    end

    def clear
      Location.clear
      redirect_to :root
    end
  end
end
