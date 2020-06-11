# frozen_string_literal: true

class CreateShops < ActiveRecord::Migration[6.0]
  def change
    create_table :shops do |t|
      t.string :shop_name
      t.string :shop_code
      t.string :address_line_1
      t.string :address_line_2
      t.string :city
      t.string :state
      t.string :pincode
      t.string :upi_payment_id
      t.string :otp
      t.string :starting_time
      t.string :closing_time
      t.integer :slot_duration
      t.integer :capacity_per_slot
      t.string :mobile_number

      t.timestamps
    end
  end
end
