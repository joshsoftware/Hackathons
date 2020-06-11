# frozen_string_literal: true

class AddOtpSecretKeyToShops < ActiveRecord::Migration[6.0]
  def change
    add_column :shops, :otp_secret_key, :string
  end
end
