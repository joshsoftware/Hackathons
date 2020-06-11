# frozen_string_literal: true

class JsonWebToken
  class << self
    def encode(payload, _exp = 7.days.from_now)
      JWT.encode(payload, Rails.application.credentials.secret_key_base)
    end

    def decode(token)
      body = JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
    rescue StandardError
      nil
    end
  end
end
