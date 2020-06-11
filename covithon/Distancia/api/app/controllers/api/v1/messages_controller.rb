# frozen_string_literal: true

class Api::V1::MessagesController < Api::BaseController
  before_action :load_token

  def create
    outcome = V1::CreateMessage.new(@token.token_number, message_params[:body], 'Shop').call

    if outcome.is_valid
      render_serialized_result(V1::MessageSerializer, outcome.result)
      TwilioService.new.send_message(Rails.application.credentials.whatsapp_from,
        @token.customer.mobile_number,
        I18n.t('service_representative', shop_name: current_shop.shop_name, body: message_params[:body])
      )
    else
      render_error_response(outcome.errors, :error)
    end
  end

  def message_params
    params.require(:message).permit(:body)
  end

  def load_token
    @token = Token.find(params[:token_id])
  end
end
