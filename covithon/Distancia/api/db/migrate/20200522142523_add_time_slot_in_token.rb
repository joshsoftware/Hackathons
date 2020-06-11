# frozen_string_literal: true

class AddTimeSlotInToken < ActiveRecord::Migration[6.0]
  def change
    add_reference :tokens, :time_slot
  end
end
