class EToken < ApplicationRecord
  belongs_to :store
  belongs_to :user

  validates :start_time, :end_time, presence: true
  validate :start_time_cannot_be_greater_than_end_time, if: :start_time_changed?
  validate :more_than_one_token_not_allowed,  if: :start_time_changed?
  validate :time_slot_cannot_be_in_the_past, if: :start_time_changed?
  validate :time_slot_full, if: :start_time_changed?
  validate :time_slot_should_be_within_store_time,  if: :start_time_changed?

  def start_time_cannot_be_greater_than_end_time
    if start_time && end_time && (start_time&.to_time > end_time&.to_time)
      errors.add(:start_time, "Start time can't be greater than end time")
    end
  end

  def generate_uniq_token
    loop do
      token = SecureRandom.hex(5)
      break token unless EToken.where(token: token, date: Date.today).exists?
    end
  end

  def formatted_time_slot
    "#{start_time.strftime('%I:%M %p')} - #{end_time.strftime('%I:%M %p')}"
  end
  
  def set_uniq_token
    update_attribute(:token, generate_uniq_token)
  end

  def available_timing
    todays_opening_time..todays_closing_time
  end

  def time_slot_should_be_within_store_time
    if store.not_within_working_hours?(start_time, end_time)
      errors.add(:time_slot, I18n.t('customer.e_token.time_slot_should_be_within_store_time'))
    end
  end

  def time_slot_cannot_be_in_the_past
    if start_time.present? && start_time < Time.current
      errors.add(:time_slot, "not available")
    end
  end

  def more_than_one_token_not_allowed
    if user && user.token_already_taken_for_store?(store_id)
      errors.add(:token, I18n.t('customer.e_token.more_than_on_token'))
    end
  end

  def time_slot_full
    if store.slot_full?(start_time, end_time)
      errors.add(:time_slot, I18n.t('customer.e_token.time_slot_full'))
    end
  end
end
