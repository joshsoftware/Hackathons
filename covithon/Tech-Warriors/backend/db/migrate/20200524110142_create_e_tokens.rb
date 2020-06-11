class CreateETokens < ActiveRecord::Migration[6.0]
  def change
    create_table :e_tokens do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.date :date
      t.string :status
      t.string :token
      t.references :store, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
