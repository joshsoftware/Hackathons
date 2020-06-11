# frozen_string_literal: true

class AddSequnceInTimeSlot < ActiveRecord::Migration[6.0]
  def change
    add_column :time_slots, :slot_sequence, :integer
  end
end
