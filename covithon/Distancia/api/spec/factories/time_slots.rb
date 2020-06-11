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
FactoryBot.define do
  factory :time_slot do
  end
end
