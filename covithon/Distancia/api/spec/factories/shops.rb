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
FactoryBot.define do
  factory :shop do
    shop_name { 'Mystring' }
    mobile_number { '81312' }
    address_line_1 { 'test' }
    capacity_per_slot { 10 }
    starting_time { 1000 }
    closing_time { 1200 }
    slot_duration { 30 }
    pincode { 411_038 }
  end
end
