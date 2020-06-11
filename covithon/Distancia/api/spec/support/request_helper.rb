# frozen_string_literal: true

module Request
  # This module is respnsible for symbolizing keys in response
  module JsonHelpers
    def json_response
      @json_response ||= JSON.parse(response.body, symbolize_names: true)
    end
  end
end
