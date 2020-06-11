class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.text :address
      t.string :area
      t.string :city
      t.string :state
      t.string :country
      t.string :pincode
      t.references :addressable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
