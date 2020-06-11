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
class Token < ApplicationRecord
  belongs_to :customer
  belongs_to :shop
  belongs_to :time_slot
  has_many :items
  has_one :booking
  has_many :messages
  after_commit :genearte_token_number, on: :create

  private

  def get_random_code
    size = 4 # Code Size
    chars = ('a'..'z').to_a + ('A'..'Z').to_a + (0..9).to_a
    (0...size).collect { chars[Kernel.rand(chars.length)] }.join
  end

  def genearte_token_number
    self.token_number = "#{shop.shop_code}#{id}#{get_random_code}"
    save
  end
end
