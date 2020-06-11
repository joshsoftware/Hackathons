# frozen_string_literal: true

class ChangeStartingTimeAndClosingTimeFormatInShop < ActiveRecord::Migration[6.0]
  def up
    change_table :shops do |_t|
      change_column :shops, :starting_time, 'integer USING CAST(starting_time AS integer)'
      change_column :shops, :closing_time, 'integer USING CAST(closing_time AS integer)'
    end
  end

  def down
    change_table :shops do |_t|
      change_column :shops, :starting_time, :string
      change_column :shops, :closing_time, :string
    end
  end
end
