# frozen_string_literal: true

require 'rubygems'
require 'twilio-ruby'

# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure

class TwilioService
  def send_message(from, to, body)
    Rails.logger.info "\nFrom: #{from}\nTo: #{to}\nBody: #{body}"
    begin
      @client = Twilio::REST::Client.new(ENV['ACCOUNT_SID'], ENV['AUTH_TOKEN'])
      message = @client.messages.create(from: from, body: body, to: to)
      puts message.sid
    rescue Twilio::REST::TwilioError => e
      puts e.message
    end
    true
  end

  def send_otp(mobile_number, otp)
    otp_client.messages.create(
      from: Rails.application.credentials.otp_client_from,
      to: mobile_number,
      body: I18n.t('otp_message', otp: otp)
    )
  end

  def otp_client
    account_sid = Rails.application.credentials.otp_client_account_sid
    auth_token = Rails.application.credentials.otp_client_auth_token
    client = Twilio::REST::Client.new(account_sid, auth_token)
  end
end

# EXAMPLE JSON API RESPONSE
# {
#   "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
#   "api_version": "2010-04-01",
#   "body": "body",
#   "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
#   "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
#   "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
#   "direction": "outbound-api",
#   "error_code": null,
#   "error_message": null,
#   "from": "+15017122661",
#   "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
#   "num_media": "0",
#   "num_segments": "1",
#   "price": null,
#   "price_unit": null,
#   "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
#   "status": "sent",
#   "subresource_uris": {
#     "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
#   },
#   "to": "+15558675310",
#   "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
# }
