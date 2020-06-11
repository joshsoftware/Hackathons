# frozen_string_literal: true

class CreateTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :tokens do |t|
      t.references :shop
      t.references :customer
      t.string :token_number

      t.timestamps
    end
  end
end
