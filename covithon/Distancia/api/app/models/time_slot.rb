# frozen_string_literal: true

# == Schema Information
#
# Table name: time_slots
#
#  id            :bigint           not null, primary key
#  end_time      :integer
#  slot_sequence :integer
#  start_time    :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  shop_id       :bigint
#
# Indexes
#
#  index_time_slots_on_shop_id  (shop_id)
#
class TimeSlot < ApplicationRecord
  belongs_to :shop
  has_many :bookings

  after_commit :assign_slot_sequence, on: :create

  def booked?
    bookings.today.count >= shop.capacity_per_slot
  end

  private

  def assign_slot_sequence
    self.slot_sequence = shop.time_slots.count
    save
  end
end
