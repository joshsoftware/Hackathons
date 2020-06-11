# frozen_string_literal: true

# == Schema Information
#
# Table name: tokens
#
#  id           :bigint           not null, primary key
#  token_number :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  customer_id  :bigint
#  shop_id      :bigint
#  time_slot_id :bigint
#
# Indexes
#
#  index_tokens_on_customer_id   (customer_id)
#  index_tokens_on_shop_id       (shop_id)
#  index_tokens_on_time_slot_id  (time_slot_id)
#
FactoryBot.define do
  factory :token do
  end
end
