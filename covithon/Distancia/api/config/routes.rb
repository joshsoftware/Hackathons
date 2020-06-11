# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :shops, only: [:update]
      resources :tokens, only: %i[index show] do
        resources :messages, only: [:create]
        member do
          delete :cancel
        end
      end
      post :generate_otp, to: 'sessions#generate_otp'
      post :authenticate_otp, to: 'sessions#authenticate_otp'
      delete :log_out, to: 'sessions#log_out'

      resources :constants, only: [:index]
    end
  end
  post 'receive_message/', to: 'twilio#receive_message'

  match '*all', controller: 'application', action: 'cors_preflight_check', via: [:options]
end
