class IndexController < ApplicationController

  respond_to :html, :json

  def index
    @parks = Park.all
    respond_with(@parks)
  end

end
