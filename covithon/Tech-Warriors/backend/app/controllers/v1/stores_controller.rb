module V1
  class StoresController < V1::BaseController
    skip_before_action :authenticate!
    before_action :load_store, only: [:available_slots, :show]

    def index
      stores =  Store.includes(:user).as_json(
                  only: [:id, :name, :contact_no, :uuid],
                  methods: [:opening_time, :closing_time, :owner, :address_attributes,
                    :available_slots]
                )

      render json: {data: stores}
    end

    def show
      render json: {data: @store.as_json(methods: [:user])}
    end

    def available_slots
      render json: {data: @store.available_slots}
    end

    private

    def load_store
      @store = Store.find_by(id: params[:id] || params[:store_id])
      return if @store
      error_response(
        message: I18n.t('store.not_found'),
        status_code: :not_found
      )
    end
  end
end