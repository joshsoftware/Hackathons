# frozen_string_literal: true

# == Schema Information
#
# Table name: bookings
#
#  id           :bigint           not null, primary key
#  date         :date
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  time_slot_id :bigint
#  token_id     :bigint
#
# Indexes
#
#  index_bookings_on_time_slot_id  (time_slot_id)
#  index_bookings_on_token_id      (token_id)
#
class Booking < ApplicationRecord
  belongs_to :time_slot
  belongs_to :token

  # scope

  scope :today, -> { where(date: Date.today) }
end
