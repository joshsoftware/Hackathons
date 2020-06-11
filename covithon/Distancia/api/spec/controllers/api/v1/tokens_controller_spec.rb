# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::TokensController, type: :controller do
  let(:shop) { create(:shop) }
  let(:customer) { create(:customer) }
  let!(:time_slot) { create(:time_slot, start_time: 1000, end_time: 1030, shop: shop) }
  let!(:token) { create(:token, time_slot: time_slot, shop: shop, customer: customer) }
  let!(:booking) { create(:booking, time_slot: time_slot, token: token, date: Date.today) }

  before do
    sign_in(shop: shop)
  end

  describe '#index' do
    it 'lists tokens' do
      get :index
      expect(json_response[:data]).not_to be_empty
    end
  end

  describe '#show' do
    it 'returns token' do
    	V1::CreateMessage.new(token.token_number, 'hi', CUSTOMER).call
    	V1::CreateMessage.new(token.token_number, 'hi', CUSTOMER).call
      get :show, params: { id: token.id }
    	byebug
      expect(json_response[:data][:id].to_i).to eq(token.id)
    end

    it 'returns error if token is invalid' do
      get :show, params: { id: 122 }
      expect(json_response[:errors]).to eq(['Record not found!'])
    end
  end

  describe '#cancel' do
    it 'cancels token' do
      expect_any_instance_of(TwilioService).to receive(:send_message)
      delete :cancel, params: { id: token.id }
      expect(token.reload.booking).to be_nil
      expect(json_response[:data][:id].to_i).to eq(token.id)
    end

    it 'returns error if token is already booked' do
      token.booking.destroy
      delete :cancel, params: { id: token.id }
      expect(json_response[:errors]).to eq(I18n.t('errors.invalid.cannot_cancel_token'))
    end
  end
end
