# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::BookToken, type: :service do
  describe '#call' do
    let(:shop) { create(:shop, shop_code: 'SHOP1', capacity_per_slot: 2) }
    let(:customer) { create(:customer) }
    let!(:time_slot) { create(:time_slot, start_time: 1000, end_time: 1030, shop: shop) }

    it 'books token for a slot and shop' do
      expect { described_class.new(shop.shop_code, time_slot.slot_sequence, customer).call }.to(
        change { Token.count }.by(1).and(change { Booking.count }.by(1))
      )
    end

    it 'returns error for invalid shop code' do
      result = described_class.new('Invalid code', time_slot.slot_sequence, customer).call
      expect(result).to eq(I18n.t('errors.invalid.shop'))
    end

    it 'returns error for invalid slot sequence' do
      result = described_class.new(shop.shop_code, 222, customer).call
      expect(result).to eq(I18n.t('errors.invalid.time_slot'))
    end

    it 'returns error slot is already booked' do
      token1, token2 = create_pair(:token, shop: shop, customer: customer, time_slot: time_slot)
      create(:booking, token: token1, time_slot: time_slot, date: Date.today)
      create(:booking, token: token2, time_slot: time_slot, date: Date.today)
      result = described_class.new(shop.shop_code, time_slot.slot_sequence, customer).call
      expect(result).to eq(I18n.t('errors.slot_full'))
    end

    it 'returns error if user is trying to book multiple slot' do
      token1 = create(:token, shop: shop, customer: customer, time_slot: time_slot)
      create(:booking, token: token1, time_slot: time_slot, date: Date.today)
      result = described_class.new(shop.shop_code, time_slot.slot_sequence, customer).call
      expect(result).to eq(I18n.t('errors.max_booking'))
    end
  end
end
