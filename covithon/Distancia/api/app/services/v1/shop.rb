# frozen_string_literal: true

class V1::Shop
  def initialize(shop_type, pincode, home_delivery: false)
    @shop_type = shop_type.upcase
    @pincode = pincode
    @home_delivery = home_delivery
  end

  def call
  	query = { shop_type: @shop_type, pincode: @pincode }
  	query[:is_home_delivery_available] = true if @home_delivery
    Shop.where(query)
  end
end
