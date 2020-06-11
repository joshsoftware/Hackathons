# frozen_string_literal: true

class Api::V1::ShopsController < Api::BaseController
  def update
    Rails.logger.info "=================================================#{params}============================================"
    if shop.update(shop_params.merge(is_registered: true))
      shop.create_time_slots if shop.time_slots.count.zero?
      data = V1::ShopSerializer.new(shop).serializable_hash
      render_success_response(I18n.t('create.success', model_name: 'Shop'), data)
    else
      render_error_response(shop.errors.full_messages, :error)
    end
  end

  private

  def shop_params
    params.require(:shop).permit(:shop_name, :mobile_number, :address_line_1,
                                 :address_line_2, :starting_time, :closing_time, :state, :city, :pincode, :shop_type,
                                 :capacity_per_slot, :slot_duration, :upi_payment_id, :is_home_delivery_available)
  end

  def shop
    Shop.find(params[:id])
  end
end
