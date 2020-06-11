class CreateStores < ActiveRecord::Migration[6.0]
  def change
    create_table :stores do |t|
      t.string :name
      t.string :contact_no
      t.integer :time_slot
      t.integer :allowed_customers
      t.time :start_time
      t.time :end_time
      t.string :store_type
      t.string :uuid
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
