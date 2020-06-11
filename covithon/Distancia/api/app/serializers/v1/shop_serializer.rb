# frozen_string_literal: true

class V1::ShopSerializer
  include FastJsonapi::ObjectSerializer

  attributes :shop_name, :mobile_number, :address_line_1, :address_line_2,
             :starting_time, :closing_time, :state, :city, :pincode, :auth_token, :is_registered,
             :is_home_delivery_available, :shop_type
end
