module V1
  class AuthController < V1::BaseController
    skip_before_action :authenticate!

    def generate_otp
      response = V1::AuthService.new(params).generate_otp

      if response[:success]
        success_response(
          data: response,
          message: I18n.t('customer.auth.otp.success')
        )
      else
        resource_error_response(
          message: I18n.t('customer.auth.otp.failed'),
          status_code: :unprocessable_entity,
          errors: response[:errors]
        )
      end
    end

    def validate_otp
      response = V1::AuthService.new(params).validate_otp

      if response[:success]
        success_response(
          data: response,
          message: I18n.t('customer.auth.otp.validate.success')
        )
      else
        resource_error_response(
          message: I18n.t('customer.auth.otp.validate.failed'),
          status_code: :unprocessable_entity,
          errors: []
        )
      end
    end

    def signup
      data = V1::AuthService.new(store_params).register_store

      if data && data[:errors].nil?
        success_response(
          data: data,
          message: I18n.t('customer.auth.signup.success')
        )
      else
        resource_error_response(
          message: I18n.t('customer.auth.signup.failed'),
          status_code: :unprocessable_entity,
          errors: data && data[:errors] || []
        )
      end
    end

    private

    def store_params
      params.require(:store).permit(:name, :contact_no, :store_type,
        :device_id,
        :start_time, :end_time, :time_slot, :allowed_customers,
        address_attributes: %i[area city state country pincode],
        owner: %i[name]
      )
    end
  end
end
