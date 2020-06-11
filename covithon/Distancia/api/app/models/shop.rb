# frozen_string_literal: true

# == Schema Information
#
# Table name: shops
#
#  id                         :bigint           not null, primary key
#  address_line_1             :string
#  address_line_2             :string
#  auth_token                 :string
#  capacity_per_slot          :integer
#  city                       :string
#  closing_time               :integer
#  is_home_delivery_available :boolean          default(FALSE)
#  is_registered              :boolean          default(FALSE)
#  mobile_number              :string
#  otp                        :string
#  otp_secret_key             :string
#  pincode                    :string
#  shop_code                  :string
#  shop_name                  :string
#  shop_type                  :string
#  slot_duration              :integer
#  starting_time              :integer
#  state                      :string
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  upi_payment_id             :string
#
class Shop < ApplicationRecord
  has_many :tokens
  has_many :time_slots
  has_many :bookings, through: :time_slots
  has_one_time_password

  validates :shop_name, :address_line_1, :starting_time, :closing_time,
            :capacity_per_slot, :slot_duration, :pincode, presence: true, on: :update

  validates :mobile_number, presence: true

  def generate_token
    self.auth_token = SecureRandom.hex(13)
    save!(validate: false)
  end

  def reset_auth_token
    self.update(auth_token: nil)
  end

  def create_time_slots
    start_time = Time.parse(starting_time.to_s.chars.insert(-3, ':').join)
    end_time = Time.parse(closing_time.to_s.chars.insert(-3, ':').join)
    loop do
      slot_end_time = start_time + slot_duration.minute
      time_slots.create(start_time: start_time.strftime('%H%M').to_i, end_time: slot_end_time.strftime('%H%M').to_i)
      start_time = slot_end_time
      break if start_time >= end_time
    end
    assign_shop_code
  end

  def assign_shop_code
    self.shop_code = "#{shop_name.gsub(/\s+/, '')[0..4].upcase}#{id}"
    save!(validate: false)
  end

  def self.get_shop_type_message
    SHOP_TYPES.map { |key, val| key.to_s + ' : *' + val + '*' }.join("\n")
  end
end
