# frozen_string_literal: true

class V1::AvailableSlot
  def initialize(shop_code)
    @shop = Shop.find_by('lower(shop_code) = ?', shop_code.downcase)
  end

  def call
    return 'Invalid Shop code!' if @shop.blank?

    bookeds_slots_ids = @shop.time_slots
                             .joins(:bookings)
                             .where(bookings: { date: Date.today })
                             .group('time_slots.id')
                             .having("count(bookings.id) = #{@shop.capacity_per_slot}")

    @shop.time_slots.where.not(id: bookeds_slots_ids).where(' start_time > ?', Time.zone.now.strftime('%H%M').to_i)
  end
end
