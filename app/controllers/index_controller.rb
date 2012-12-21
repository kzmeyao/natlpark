class IndexController < ApplicationController

  def index
    @parks = Park.all.as_json(:except => [ :id, :created_at, :updated_at ])
  end

end
