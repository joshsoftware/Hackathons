class CreateDigitalTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :digital_tokens do |t|
      t.references :user, null: false, foreign_key: true
      t.references :store, null: false, foreign_key: true
      t.string :token
      t.datetime :issued_at
      t.datetime :expires_at

      t.timestamps
    end
  end
end
