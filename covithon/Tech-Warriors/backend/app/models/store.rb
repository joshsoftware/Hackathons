class Store < ApplicationRecord
  STORE_TYPES = {
      grocery: "Grocery",
      liquor: "Liquor",
      medical: "Medical Shop"
    }.as_json

  belongs_to :user
  has_many :digital_tokens
  has_one :address, as: :addressable
  has_many :e_tokens
  has_many :users, through: :e_tokens

  accepts_nested_attributes_for :address, update_only: true, allow_destroy: true

  validates :name, uniqueness: true

  def generate_uniq_code
    loop do
      token = "#{name.split(" ").join.first(4).upcase}#{SecureRandom.hex(2)}"
      break token unless Store.where(uuid: token).exists?
    end
  end

  def todays_tokens
    e_tokens.where(date: Date.today)
  end

  def set_uniq_code
    update_column(:uuid, generate_uniq_code)
  end

  def opening_time
    start_time.strftime('%I:%M %p')
  end

  def closing_time
    end_time.strftime('%I:%M %p')
  end

  def owner
    user.as_json(only: [:name, :mobile_number])
  end

  def address_attributes
    address.presence.as_json
  end

  def todays_opening_time
    Time.zone.parse("#{Date.current} #{start_time.strftime('%H:%M')}")
  end

  def todays_closing_time
    Time.zone.parse("#{Date.current} #{end_time.strftime('%H:%M')}")
  end

  def available_timing
    todays_opening_time..todays_closing_time
  end

  def slot_full?(slot_start_time, slot_end_time)
    count = e_tokens.
              where(start_time: slot_start_time, end_time: slot_end_time).
              size

    count >= allowed_customers
  end

  def not_within_working_hours?(start_time, end_time)
    todays_opening_time > start_time || todays_closing_time < end_time
  end

  def available_slots
    duration = time_slot
    slots = (((end_time - start_time)/60)/duration).round(2).to_i
    data = []
    s_time = todays_opening_time

    return [] if Time.current > todays_closing_time

    slots.times do |index|
      slot_start_time = s_time + (duration * index).minutes
      slot_end_time = s_time + (duration * (index+1)).minutes

      next if (Time.current > slot_start_time) || slot_full?(slot_start_time, slot_end_time)

      data << {
        start_time: slot_start_time.strftime('%I:%M %p'),
        end_time: slot_end_time.strftime('%I:%M %p')
      }
    end

    data
  end
end
