# frozen_string_literal: true

class AddFieldsToShop < ActiveRecord::Migration[6.0]
  def change
    add_column :shops, :auth_token, :string
    add_column :shops, :is_registered, :boolean, default: false
  end
end
