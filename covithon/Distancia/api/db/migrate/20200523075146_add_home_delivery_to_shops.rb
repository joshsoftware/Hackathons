# frozen_string_literal: true

class AddHomeDeliveryToShops < ActiveRecord::Migration[6.0]
  def change
    add_column :shops, :is_home_delivery_available, :boolean, default: false
  end
end
