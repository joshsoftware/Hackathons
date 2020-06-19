class CreateMeet < ActiveRecord::Migration[5.2]
  def change
    create_table :meets do |t|
      t.string :room
      t.string :password

      t.timestamps
    end
  end
end
