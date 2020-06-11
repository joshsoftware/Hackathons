# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::Shop, type: :service do
  describe '#call' do
    let(:groc_shop_type) { 'GROC' }
    let(:med_shop_type) { 'MED' }
    let(:pincode) { '411014' }
    let!(:shops_groc) { create_list(:shop, 2, shop_type: groc_shop_type, pincode: pincode) }
    let!(:shops_med) { create_list(:shop, 2, shop_type: med_shop_type, pincode: pincode) }

    it 'lists shops of a type GROC and of pin code 411014' do
      result = described_class.new(groc_shop_type, pincode).call
      expect(result.pluck(:shop_type, :pincode).uniq).to eq([[groc_shop_type, pincode]])
    end

    it 'lists shops of a type MED and of pin code 411014' do
      result = described_class.new(med_shop_type, pincode).call
      expect(result.pluck(:shop_type, :pincode).uniq).to eq([[med_shop_type, pincode]])
    end
  end
end
