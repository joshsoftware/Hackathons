# frozen_string_literal: true

class CreateBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :bookings do |t|
      t.references :time_slot
      t.references :token
      t.date :date

      t.timestamps
    end
  end
end
