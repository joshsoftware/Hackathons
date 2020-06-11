# frozen_string_literal: true

class CreateTimeSlots < ActiveRecord::Migration[6.0]
  def change
    create_table :time_slots do |t|
      t.references :shop
      t.integer :start_time
      t.integer :end_time

      t.timestamps
    end
  end
end
