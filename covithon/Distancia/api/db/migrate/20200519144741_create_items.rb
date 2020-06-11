# frozen_string_literal: true

class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.references :token
      t.string :name
      t.boolean :is_available, default: true

      t.timestamps
    end
  end
end
