# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.references :sender, polymorphic: true
      t.references :reciever, polymorphic: true
      t.text :body
      t.references :token

      t.timestamps
    end
  end
end
