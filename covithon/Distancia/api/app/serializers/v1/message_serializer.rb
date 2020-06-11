# frozen_string_literal: true

class V1::MessageSerializer
  include FastJsonapi::ObjectSerializer

  attributes :body, :token_id

  attribute :sender do |object|
    object.sender_type.eql?(SHOP) ? SHOP : CUSTOMER
  end

  attribute :created_at do |object|
  	object.created_at
  end
end
