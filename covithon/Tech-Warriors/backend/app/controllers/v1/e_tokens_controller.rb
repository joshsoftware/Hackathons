module V1
  class ETokensController < V1::BaseController
    skip_before_action :authenticate!
    before_action :load_store

    def index
      success_response(
        data: @store.e_tokens.as_json(methods: [:user]),
        message: nil
      )
    end

    def create
      data =  V1::ETokensService.new(params: e_token_params, store: @store).create

      if data && data[:errors].nil?
        success_response(
          data: data,
          message: I18n.t('customer.e_token.create.success')
        )
      else
        resource_error_response(
          message: I18n.t('customer.e_token.create.failed'),
          status_code: :unprocessable_entity,
          errors: data[:errors] || []
        )
      end
    end

    private

    def load_store
      @store = Store.where(id: params[:store_id]).first
      return if @store

      error_response(
        message: I18n.t('store.not_found'),
        status_code: :not_found
      )
    end

    def e_token_params
      params.require(:e_token).permit(:start_time, :end_time, :store_id, :user_id, :store_id)
    end
  end
end
