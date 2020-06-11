# frozen_string_literal: true

class V1::TokenSerializer
  include FastJsonapi::ObjectSerializer

  has_many :messages

  attributes :shop_id, :customer_id, :token_number

  attribute :slot_start_time do |object|
    object.time_slot&.start_time
  end

  attribute :slot_time do |object|
    start_time = Time.parse(object.time_slot.start_time.to_s.chars.insert(-3, ':').join).strftime('%H:%M %p')
    end_time = Time.parse(object.time_slot.end_time.to_s.chars.insert(-3, ':').join).strftime('%H:%M %p')
    "#{start_time} - #{end_time}"
  end

  attribute :customer_mobile do |object|
    object.customer&.mobile_number
  end

  attribute :home_delivery do |object|
    object.shop&.is_home_delivery_available || false
  end

  attribute :slot_end_time do |object|
    object.time_slot&.end_time
  end

  attribute :date do |object|
    object.created_at&.strftime('%d-%m-%Y')
  end

  attribute :is_cancelled do |object|
    object.booking.blank?
  end
end
