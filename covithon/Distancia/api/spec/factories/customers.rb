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
FactoryBot.define do
  factory :customer do
  end
end
