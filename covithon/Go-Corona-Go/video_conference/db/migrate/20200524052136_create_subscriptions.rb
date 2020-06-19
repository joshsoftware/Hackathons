class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.datetime :validity_start
      t.datetime :validity_end
      t.string :type
      t.boolean :status
      t.string :company_id
    end
  end
end
