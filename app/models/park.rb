class Park < ActiveRecord::Base
  attr_accessible :date_formed, :description, :lat, :lon, :name, :state
end
