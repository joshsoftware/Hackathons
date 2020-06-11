
class VerificationsController < ApplicationController
  before_action :get_user

  def create
    message = get_message.gsub("\n", "(br)")
    # divide data into chunks of 1600
    chunks = message.gsub(/\s+/, ' ').scan(/.{1,1600}(?: |$)/).map(&:strip)
    chunks.each do |chunk_message|
      TwilioTextMessenger.new(chunk_message.gsub('(br)', "\n"), params["From"]).call
    end
    render json: { message: message }
  end

  private

  def from_number
    params['From'].split(WHATAPP_PREFIX)[1]
  end

  def get_message
    if get_token_request?
      load_store(params[:Body].split(" ")[1])
      return I18n.t('store.not_found') if @store.nil?
      @slots = @store.available_slots
      return "No Slots available for today" if @slots.empty?
      set_slots_in_the_redis
      construct_available_slots_message
    elsif slots_available_in_redis?
      load_store(data_in_redis["store_id"])
      return "Invalid input" unless slot_number_valid?
      @e_token = generate_token_for_the_slot
      if @e_token.valid?
        @e_token.set_uniq_token
        clear_redis_data
        return construct_e_token_message
      end
      return construct_validation_error
    else
      "Invalid input"
    end
  end

  def get_user
    @user = User.find_or_create_by(mobile_number: from_number, role_id: 1)
  end

  def construct_e_token_message
    return "EToken Id: #{@e_token.token} \n #{@store.name} \n Date: #{@e_token.date}\n time slot: #{@e_token.formatted_time_slot}"
  end

  def construct_validation_error
    errors = @e_token.errors.messages
    return errors.has_key?(:token) ? errors[:token].first : errors[:time_slot].first
  end

  def generate_token_for_the_slot
    @store.e_tokens.find_or_create_by(
      data_in_redis["slots"][params[:Body].to_i - 1]
      .merge(date: Date.today, user_id: @user.id)
    )
  end

  def clear_redis_data
    redis = RedisService.new
    redis.del({key: @user.mobile_number})
  end

  def set_slots_in_the_redis
    redis = RedisService.new
    redis.set_json({key: @user.mobile_number, data: {date: Date.today, slots: @slots, store_id: @store.uuid} })
  end

  def construct_available_slots_message
    "\n #{@store.name} \n\n Available slots on #{Date.today} \n\n #{formatted_slots}\n\n To book slots enter number #{@slots.size > 1 ? "1-#{@slots.size}" : "1"}"
  end

  def formatted_time_slot(slot)
    "#{slot[:start_time]} - #{slot[:end_time]}"
  end

  def formatted_slots
    slots_list = ""
    @slots.each_with_index do |slot, index|
      slots_list += "#{index+1}. #{formatted_time_slot(slot)} \n"
    end
    slots_list
  end

  def slot_number_valid?
    params[:Body].to_i.between?(1, data_in_redis && data_in_redis["slots"].size)
  end

  def slots_available_in_redis?
    data = data_in_redis

    data && (data["date"] == Date.today.strftime("%F") && data["slots"].size > 0)
  end

  def data_in_redis
    redis = RedisService.new
    redis.get_json({key: @user.mobile_number })
  end

  def load_store(id)
    @store = Store.find_by(uuid: id)
  end

  def get_token_request?
    params[:Body] && params[:Body].split(" ").size > 1 && params[:Body].start_with?("TOKEN ")
  end

end