# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Shop, type: :model do
  context '#create_time_slots' do
    it 'create slot for shop' do
      shop = create(:shop, starting_time: 1000, closing_time: 1200, slot_duration: 30)
      shop.create_time_slots
      expect(shop.time_slots).not_to be_empty
      expect(shop.time_slots.count).to eq 4
    end
  end

  context '#assign_shop_code' do
    it 'assign shop code' do
      shop = create(:shop, id: 1, shop_name: 'Sweety General Stores')
      shop.assign_shop_code
      expect(shop.shop_code).to eq 'SWEET1'
    end
  end
end
