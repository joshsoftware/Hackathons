# frozen_string_literal: true

class TwilioController < ApplicationController
  require 'rubygems'
  require 'twilio-ruby'

  def receive_message
    @to = params['To']
    @from = params['From']
    @body = params['Body']

    Rails.logger.info "\nBODY: #{@body}\n"

    @customer = Customer.where(mobile_number: @from).first
    @customer ||= Customer.create(mobile_number: @from, state: 'welcome_message', language: :en)
    I18n.locale = :en
    I18n.locale = :hn if @customer.try(:language) == 'hn'

    keywords = @body.split(' ')
    # To filter special keywords viz. MENU, BOOK <shop_code>, CANCEL <token_code>, LANG <HINDI / ENG> etc.

    if keywords[0].upcase == 'MENU'
      @customer.update(state: 'welcome_message')

    elsif keywords[0].upcase == 'LANG' # Expected format:   LANG HINDI / ENG
      if keywords.length > 1
        if keywords[1].upcase == 'HINDI' && @customer.language != 'hn'
          I18n.locale = :hn
          TwilioService.new.send_message(@to, @from, I18n.t('language.changed'))
          @customer.update(language: 'hn')  # State to back if possible
        elsif (keywords[1].upcase == 'ENGLISH' || keywords[1].upcase == 'ENG') && @customer.language != 'en'
          I18n.locale = :en
          TwilioService.new.send_message(@to, @from, I18n.t('language.changed'))
          @customer.update(language: 'en')  # State to back if possible
        end
      else # Invalid language
        TwilioService.new.send_message(@to, @from, I18n.t('language.invalid'))
      end

    elsif keywords[0].upcase == 'CANCEL'
      if keywords.length > 1
        token_number = keywords[1]
        token = Token.where('lower(token_number) = ?', token_number.downcase).last
        if token && token.customer_id == @customer.id
          shop = Shop.find(token.shop_id)
          slot = TimeSlot.find(token.time_slot_id)
          slot = get_slot_time(slot)
          details = '*' + shop.shop_name + "*\n*" + slot + '*'
          token.booking.destroy
          body = I18n.t 'cancel.success', deep_interpolation: true, details: details
          TwilioService.new.send_message(@to, @from, body)
        else
          TwilioService.new.send_message(@to, @from, I18n.t('cancel.invalid_code'))
        end
        return
      else
        TwilioService.new.send_message(@to, @from, I18n.t('cancel.error'))
        return
      end

    elsif keywords[0].upcase == 'BOOK' # Expected format:   BOOK <shop_code>
      if keywords.length > 1
        shop_code = keywords[1]
        shop = Shop.where('lower(shop_code) = ?', shop_code.downcase).last
        if shop
          @customer.update(selected_shop_code: shop_code, selected_shop_type: shop.shop_type, state: 'enter_time_slot')
          slots = V1::AvailableSlot.new(shop_code).call
          type = DISPLAY_TYPES[:en].key(shop.shop_type.upcase)
          type = DISPLAY_TYPES[:hn].key(shop.shop_type.upcase) if @customer.try(:language) == 'hn'
          if slots == 'Invalid Shop code!'
            body = I18n.t 'shop_code_error', deep_interpolation: true, type: type
            TwilioService.new.send_message(@to, @from, body)
            return
          elsif slots.empty?
            body = I18n.t 'shop_config_error', deep_interpolation: true, type: type
            TwilioService.new.send_message(@to, @from, body)
            return
          else
            shop_details = shop.shop_name
            shop_details += ', ' + shop.address_line_1 if shop.address_line_1.present?
            shop_details += ', ' + shop.city if shop.city.present?
            shop_details += ', ' + shop.pincode if shop.pincode.present?
            body = I18n.t 'select_timeslot', deep_interpolation: true, shop_details: shop_details, slots: format_sots(slots)
            TwilioService.new.send_message(@to, @from, body)
            return
          end
        else
          TwilioService.new.send_message(@to, @from, I18n.t('book.shop_error'))
          return
        end
      else
        TwilioService.new.send_message(@to, @from, I18n.t('book.invalid_command')) # invalid Book command
        return
      end

    elsif keywords[0].upcase == "MSG"  #  Expected format: MSG <token> <Your text message>
      if keywords.length > 1
        token_number = keywords[1]
        token = Token.where('lower(token_number) = ?', token_number.downcase).last
        if token && token.customer_id == @customer.id
          if keywords.length > 2
            V1::CreateMessage.new(token.token_number, keywords[2, keywords.length].join(" "), 'Customer').call
            TwilioService.new.send_message(@to, @from, I18n.t("message.success"))
          else
            TwilioService.new.send_message(@to, @from, I18n.t("message.empty"))    # Empty Message
          end
        else
          TwilioService.new.send_message(@to, @from, I18n.t("cancel.invalid_code")) # Invalid Token
        end
        return
      else
        TwilioService.new.send_message(@to, @from, I18n.t("message.invalid"))
        return
      end
    end

    if @customer.state == 'welcome_message'
      welcome_message
    elsif @customer.state == 'enter_pincode_shop_type'
      enter_pincode_shop_type
    elsif @customer.state == 'enter_shop_code'
      enter_shop_code
    elsif @customer.state == 'enter_time_slot'
      enter_time_slot
    end

    response = { "status": 'success' }
    render json: response
  end

  private

  def validate_pincode(pincode)
    pincode.length != 6 || !pincode.scan(/\D/).empty?
  end

  def welcome_message
    body = I18n.t 'welcome_message', deep_interpolation: true, shop_types: Shop.get_shop_type_message
    @customer.update(state: 'enter_pincode_shop_type') if TwilioService.new.send_message(@to, @from, body)
  end

  def enter_pincode_shop_type
    body = @body.split(' ')
    if body.length > 1
      pin_code = body[0]
      shop_type = body[1].upcase

      if validate_pincode(pin_code) && SHOP_TYPES.values.exclude?(shop_type)
        body = I18n.t 'pin_and_shop_type_error', deep_interpolation: true, shop_types: Shop.get_shop_type_message
        TwilioService.new.send_message(@to, @from, body)
      elsif validate_pincode(pin_code)
        TwilioService.new.send_message(@to, @from, I18n.t('pin_code_error'))
      elsif SHOP_TYPES.values.exclude?(shop_type) # Shop Type Validation
        body = I18n.t 'shop_type_error', deep_interpolation: true, shop_types: Shop.get_shop_type_message
        TwilioService.new.send_message(@to, @from, body)
      else # Valid Input
        if body.length > 2 && body[2].upcase == "HD"
          shops = V1::Shop.new(shop_type, pin_code, home_delivery: true).call
        else
          shops = V1::Shop.new(shop_type, pin_code).call
        end
        type = DISPLAY_TYPES[:en].key(shop_type.upcase)
        type = DISPLAY_TYPES[:hn].key(shop_type.upcase) if @customer.try(:language) == 'hn'
        if shops.empty?
          body = I18n.t 'no_shops_message', deep_interpolation: true, type: type
        else
          @customer.update(selected_pincode: pin_code, selected_shop_type: shop_type, state: 'enter_shop_code')
          body = I18n.t 'select_shop_code', deep_interpolation: true, type: type
          body += shops.to_a.map do |s|
            s.shop_name + ' CODE: *' + s.shop_code + '*' if s.time_slots.count > 0
          end .join("\n")
        end
        TwilioService.new.send_message(@to, @from, body)
      end
    else
      body = I18n.t 'pin_and_shop_type_error', deep_interpolation: true, shop_types: Shop.get_shop_type_message
      TwilioService.new.send_message(@to, @from, body)
    end
  end

  def enter_shop_code
    body = @body.split(' ')
    shop_code = body[0].downcase
    shop = Shop.where('lower(shop_code) = ?', shop_code).last
    slots = V1::AvailableSlot.new(shop_code).call
    shop_type = @customer.selected_shop_type
    type = DISPLAY_TYPES[:en].key(shop_type.upcase)
    type = DISPLAY_TYPES[:hn].key(shop_type.upcase) if @customer.try(:language) == 'hn'
    if slots == 'Invalid Shop code!'
      body = I18n.t 'shop_code_error', deep_interpolation: true, type: type
      TwilioService.new.send_message(@to, @from, body)
    elsif slots.empty?
      body = I18n.t 'shop_config_error', deep_interpolation: true, type: type
      TwilioService.new.send_message(@to, @from, body)
    else
      @customer.update(selected_shop_code: shop_code, state: 'enter_time_slot')
      shop_details = shop.shop_name
      shop_details += ', ' + shop.address_line_1 if shop.address_line_1.present?
      shop_details += ', ' + shop.city if shop.city.present?
      shop_details += ', ' + shop.pincode if shop.pincode.present?
      body = I18n.t 'select_timeslot', deep_interpolation: true, shop_details: shop_details, slots: format_sots(slots)
      TwilioService.new.send_message(@to, @from, body)
    end
  end

  def format_sots(slots)
    retVal = ''
    slots.each do |s|
      start_time = s.start_time.to_s.insert(2, ':')
      end_time = s.end_time.to_s.insert(2, ':')
      retVal += start_time + ' to ' + end_time + '  Code: *' + s.slot_sequence.to_s + "* \n"
    end
    retVal
  end

  def enter_time_slot
    body = @body.split(' ')
    slot_sequence = body[0].to_i # "STRING".to_i  =>  0
    if slot_sequence > 0
      token = V1::BookToken.new(@customer.selected_shop_code, slot_sequence, @customer).call
      if token == I18n.t('errors.invalid.time_slot')
        slots = V1::AvailableSlot.new(@customer.selected_shop_code).call
        body = I18n.t 'timeslot_error', deep_interpolation: true, slots: format_sots(slots)
        TwilioService.new.send_message(@to, @from, body)
      elsif token == I18n.t('errors.slot_full')
        slots = V1::AvailableSlot.new(@customer.selected_shop_code).call
        body = I18n.t 'timeslot_error', deep_interpolation: true, slots: format_sots(slots)
        TwilioService.new.send_message(@to, @from, body)
      elsif token == I18n.t('errors.max_booking')
        type = DISPLAY_TYPES[:en].key(@customer.selected_shop_type.upcase)
        type = DISPLAY_TYPES[:hn].key(@customer.selected_shop_type.upcase) if @customer.try(:language) == 'hn'
        body = I18n.t 'max_booking', deep_interpolation: true, type: type
        TwilioService.new.send_message(@to, @from, body)
      elsif token == I18n.t('errors.slot_full')
        slots = V1::AvailableSlot.new(@customer.selected_shop_code).call
        body = I18n.t "timeslot_error", deep_interpolation: true, slots: format_sots(slots)
        TwilioService.new.send_message(@to, @from, body)
      elsif token == I18n.t('errors.max_booking')
        type = DISPLAY_TYPES[:en].key(@customer.selected_shop_type.upcase)
        type = DISPLAY_TYPES[:hn].key(@customer.selected_shop_type.upcase) if @customer.try(:language) == "hn"
        body = I18n.t "max_booking", deep_interpolation: true, type: type
        TwilioService.new.send_message(@to, @from, body)
      else
        shop = Shop.where('lower(shop_code) = ?', @customer.selected_shop_code.downcase).last
        slot = shop.time_slots.where(slot_sequence: slot_sequence).last
        body = I18n.t 'booking_successful', deep_interpolation: true, shop: shop.shop_name, slot_time: get_slot_time(slot), token_number: token.token_number
        TwilioService.new.send_message(@to, @from, body)
      end
    else
      slots = V1::AvailableSlot.new(@customer.selected_shop_code).call
      body = I18n.t 'timeslot_error', deep_interpolation: true, slots: format_sots(slots)
      TwilioService.new.send_message(@to, @from, body)
    end
  end

  def get_slot_time(slot)
    start_time = slot.start_time.to_s.insert(2, ':')
    end_time = slot.end_time.to_s.insert(2, ':')
    start_time + ' to ' + end_time
  end
end

# params = { "SmsMessageSid" => "SM67585fdc1294e00d47d0867790ef1aca",
#            "NumMedia" => "0",
#            "SmsSid" => "SM67585fdc1294e00d47d0867790ef1aca",
#            "SmsStatus" => "received",
#            "Body" => "411011 D",
#            "To" => "whatsapp:+14155238886",
#            "NumSegments" => "1",
#            "MessageSid" => "SM67585fdc1294e00d47d0867790ef1aca",
#            "AccountSid" => "ACa7dfa926810a45c20944ad76982efc8f",
#            "From" => "whatsapp:+917276962814",
#            "ApiVersion" => "2010-04-01",
#            "id" => "1" }
