# frozen_string_literal: true

class RenameSpellMistake < ActiveRecord::Migration[6.0]
  def change
    rename_column :messages, :reciever_type, :receiver_type
    rename_column :messages, :reciever_id, :receiver_id
  end
end
