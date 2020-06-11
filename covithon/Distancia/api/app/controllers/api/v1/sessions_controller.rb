# frozen_string_literal: true

require 'json_web_token'

class Api::V1::SessionsController < ApplicationController
  before_action :load_shop, except: :log_out

  def generate_otp
    TwilioService.new.send_otp(@shop.mobile_number, @shop.otp_code)
    render_success_response('OTP generated successfully!')
  end

  def authenticate_otp
    if @shop.authenticate_otp(params[:otp], drift: 200)
      @shop.generate_token
      response.headers['auth'] = JsonWebToken.encode(@shop.reload.auth_token)
      render_serialized_result(V1::ShopSerializer, @shop)
    else
      render_error_response('Failed to authenticate!', :unauthorized)
    end
  end

  def log_out
    return render_error_response('Failed to authenticate!', :unauthorized) if current_shop.nil?
    current_shop.reset_auth_token
    render_serialized_result(V1::ShopSerializer, current_shop)
  end

  private

  def load_shop
    @shop = Shop.find_or_create_by!(mobile_number: params[:mobile_number])
  end

  def current_shop
    auth = JsonWebToken.decode(request.headers['auth'])
    @current_shop ||= Shop.where.not(auth_token: nil).find_by(auth_token: auth)
  end
end
