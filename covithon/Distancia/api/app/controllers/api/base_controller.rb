# frozen_string_literal: true

require 'json_web_token'

class Api::BaseController < ApplicationController
  before_action :load_current_shop
  before_action :authenticate_shop!

  def load_current_shop
    current_shop
  end

  def current_shop
    auth = JsonWebToken.decode(request.headers['auth'])
    @current_shop ||= Shop.where.not(auth_token: nil).find_by(auth_token: auth)
  end

  def authenticate_shop!
    render_error_response('Failed to authenticate!', :unauthorized) if current_shop.nil?
    true
  end
end
