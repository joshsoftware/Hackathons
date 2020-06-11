# frozen_string_literal: true

class AddStateToCustomer < ActiveRecord::Migration[6.0]
  def change
    add_column :customers, :state, :string
    add_column :customers, :last_response, :time
    add_column :customers, :last_input, :string
    add_column :customers, :selected_pincode, :string
    add_column :customers, :selected_shop_type, :string
    add_column :customers, :selected_shop_code, :string
  end
end
