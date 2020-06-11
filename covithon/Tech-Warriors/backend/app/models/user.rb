class User < ApplicationRecord
  has_one_time_password column_name: :otp_secret_key, length: 4

  belongs_to :role, optional: true
  has_one :address, as: :addressable

  accepts_nested_attributes_for :address, update_only: true, allow_destroy: true

  has_many :digital_tokens
  has_many :stores, through: :e_tokens
  has_many :e_tokens
  has_many :devices

  validates :mobile_number, presence: true

  def set_active
    update_column(:is_active, true)
  end

  def token_already_taken_for_store?(store_id)
    e_tokens.where(store_id: store_id, date: Date.today ).count > 0
  end
end
