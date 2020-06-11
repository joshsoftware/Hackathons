require 'rqrcode'

module V1
  class AuthService
    def initialize(params)
      @params = params
      @mobile_number = params[:mobile_number]
      @role = params[:role]
      @device_id = params[:device_id]
      @otp = params[:otp]
    end

    def generate_otp
      user = User.find_or_create_by(mobile_number: @mobile_number, role: Role.consumer)
      response = Hash.new

      if user.valid?
        user.update_column(:device_id, @device_id)
        response[:otp] = user.otp_code
        p "=======================OTP================="
        p user.otp_code
        response[:success] = true
      else
        response[:errors] = user.errors.messages
        response[:success] = false
      end

      response
    end

    def validate_otp
      user = User.find_by(device_id: @device_id)
      response = Hash.new
      if user.present? #&& user.authenticate_otp(@otp, drift: 3000)
        response[:user] = user
        response[:success] = true
      else
        response[:success] = false
      end

      response
    end

    def register_store
      user = User.find_by(device_id: @params[:device_id])
      return false unless user
      store = Store.new(@params.except("device_id").except("owner"))
      store.user = user
      
      if store.save 
        user.update(
          name: @params[:owner] ? @params[:owner][:name] : '', 
          role: Role.store_admin, is_active: true)
        store.set_uniq_code
        qr_code_path = generate_qr_code(store.uuid)
        {
          store: store.as_json(methods: [:user, :address]),
          qr_code_path: "#{APPLICATION_URI}/#{qr_code_path}"
        }
      else
        {
          errors: store.errors.messages
        }
      end
    end

    private
    def generate_qr_code(token)
      qrcode = RQRCode::QRCode.new("#{Rails.application.credentials.twilio[:twilio_whatsapp_number]}:TOKEN #{token}")

      # NOTE: showing with default options specified explicitly
      png = qrcode.as_png(
        bit_depth: 1,
        border_modules: 4,
        color_mode: ChunkyPNG::COLOR_GRAYSCALE,
        color: 'black',
        file: nil,
        fill: 'white',
        module_px_size: 6,
        resize_exactly_to: false,
        resize_gte_to: false,
        size: 120
      )

      qr_code_path = "qr-codes/#{token}.png"
      IO.binwrite("public/#{qr_code_path}", png.to_s)
      qr_code_path
    end
  end
end
