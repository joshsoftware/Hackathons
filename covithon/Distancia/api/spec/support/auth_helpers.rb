# frozen_string_literal: true

require 'json_web_token'

module AuthHelpers
  def sign_in(shop: nil)
    @shop = shop || FactoryBot.create(:shop)
    @shop.generate_token
    toggle_session(JsonWebToken.encode(@shop.reload.auth_token))
    @shop
  end

  def toggle_session(auth_token = nil)
    request.headers['auth'] = auth_token
  end
end
