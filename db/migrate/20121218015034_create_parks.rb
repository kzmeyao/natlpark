class CreateParks < ActiveRecord::Migration
  def change
    create_table :parks do |t|
      t.string :name
      t.string :state
      t.float :lat
      t.float :lon
      t.text :description
      t.string :date_formed

      t.timestamps
    end
  end
end
