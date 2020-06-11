class TwilioTextMessenger
  attr_reader :message, :number

  def initialize(message, number, send_whatsapp_message=true)
    @message = message
    @number = number
    @from = send_whatsapp_message ? "whatsapp:#{Rails.application.credentials.twilio[:twilio_whatsapp_number]}" : Rails.application.credentials.twilio[:twilio_from_number]
  end

  def call
    client = Twilio::REST::Client.new
    client.messages.create({
      from: @from,
      to: number,
      body: message
    })
  end
end