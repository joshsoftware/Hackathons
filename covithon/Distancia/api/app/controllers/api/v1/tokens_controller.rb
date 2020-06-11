# frozen_string_literal: true

class Api::V1::TokensController < Api::BaseController
  # before_action :load_shop

  def index
    tokens = current_shop.tokens.joins(:time_slot)
                         .where("DATE(tokens.created_at) = ?", date)
                         .order('time_slots.start_time ASC')
    render_serialized_result(V1::TokenSerializer, tokens)
  end

  def show
    token = current_shop.tokens.find(params[:id])
    render_serialized_result(V1::TokenSerializer, token, { include: [:messages] })
  end

  def cancel
    token = current_shop.tokens.find(params[:id])
    if token.booking&.destroy
      TwilioService.new.send_message(Rails.application.credentials.whatsapp_from,
                                     token.customer.mobile_number,
                                     I18n.t('cancel.cancelled_by_shop', token_number: token.token_number, shop_name: current_shop.shop_name))
      render_serialized_result(V1::TokenSerializer, token.reload, { include: [:messages] })
    else
      render_error_response(I18n.t('errors.invalid.cannot_cancel_token'), :error)
    end
  end

  def date
    return Date.parse(params[:date]) if params[:date].present?

    Date.today
  end
end
