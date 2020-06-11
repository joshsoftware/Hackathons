# frozen_string_literal: true

class V1::CreateMessage
  def initialize(token_number, body, sender)
    @token = Token.find_by('lower(token_number) = ?', token_number.downcase)
    @body = body
    @sender = sender
  end

  def call
    outcome = OpenStruct.new
    return I18n.t('invalid_token') if @token.blank?

    sender = @sender.casecmp?(SHOP) ? @token.shop : @token.customer
    receiver = @sender.casecmp?(SHOP) ? @token.customer : @token.shop

    message = @token.messages.new(sender: sender, receiver: receiver, body: @body)

    if message.save
      outcome.result = message
      outcome.is_valid = true
    else
      outcome.is_valid = false
      outcome.errors = message.errors
    end
    outcome
  end
end
