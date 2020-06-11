# frozen_string_literal: true

class AddColumnShopType < ActiveRecord::Migration[6.0]
  def change
    add_column :shops, :shop_type, :string
  end
end
