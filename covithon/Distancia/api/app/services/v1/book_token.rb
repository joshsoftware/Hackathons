# frozen_string_literal: true

class V1::BookToken
  def initialize(shop_code, slot_sequence, customer)
    @shop = Shop.find_by('lower(shop_code) = ?', shop_code.downcase)
    @time_slot = begin
                   @shop.time_slots.find_by(slot_sequence: slot_sequence)
                 rescue StandardError
                   nil
                 end
    @customer = customer
  end

  def call
    return I18n.t('errors.invalid.shop') if @shop.blank?
    return I18n.t('errors.invalid.time_slot') if @time_slot.blank?
    return I18n.t('errors.invalid.time_slot') if @time_slot.start_time < Time.zone.now.strftime('%H%M').to_i

    TimeSlot.transaction do
      @time_slot.lock!

      return I18n.t('errors.slot_full') if @time_slot.booked?
      return I18n.t('errors.max_booking') if @customer.has_booked_slot_for_today?(@shop)

      token = Token.create(shop: @shop, customer: @customer, time_slot: @time_slot)
      token.build_booking(token: token, time_slot: @time_slot, date: Date.today)

      return token.errors.full_messages unless token.save

      token
    end
  end
end
