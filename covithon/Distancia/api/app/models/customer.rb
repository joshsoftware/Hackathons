# frozen_string_literal: true

# == Schema Information
#
# Table name: customers
#
#  id                 :bigint           not null, primary key
#  language           :string
#  last_input         :string
#  last_response      :time
#  mobile_number      :string
#  selected_pincode   :string
#  selected_shop_code :string
#  selected_shop_type :string
#  state              :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class Customer < ApplicationRecord
  include AASM
  has_many :tokens

  aasm column: 'state' do
    state :welcome_message, initial: true
    state :enter_pincode_shop_type, :enter_shop_code, :enter_time_slot
  end

  def has_booked_slot_for_today?(shop)
    shop.bookings.today.joins(:token).where(tokens: { customer_id: id }).exists?
  end
end
