class AddDeviceIdToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :device_id, :string
  end
end
