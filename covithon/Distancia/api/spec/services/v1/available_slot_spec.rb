# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::AvailableSlot, type: :service do
  describe '#call' do
    let(:shop) { create(:shop, shop_code: 'SHOP1', capacity_per_slot: 2) }
    let!(:time_slot1) { create(:time_slot, start_time: Time.now.strftime('%H%M').to_i + 30, end_time: 1030, shop: shop) }
    let!(:time_slot2) { create(:time_slot, start_time: Time.now.strftime('%H%M').to_i + 30, end_time: 1100, shop: shop) }

    it 'returns all available time slots' do
      result = described_class.new(shop.shop_code).call
      expect(result).to eq([time_slot1, time_slot2])
    end

    it 'does not returns booked slots' do
      customer = create(:customer)
      token = create(:token, shop: shop, customer: customer, time_slot: time_slot2)
      create_pair(:booking, time_slot: time_slot2, date: Date.today, token: token)
      result = described_class.new(shop.shop_code).call
      expect(result).to eq([time_slot1])
    end
  end
end
