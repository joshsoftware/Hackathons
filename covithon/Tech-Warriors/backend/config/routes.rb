Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/sms', to: "verifications#create"
  api_version(
    module: 'V1',
    header: {
      name: 'Accept',
      value: 'application/vnd.shoptok.com; version=v1',
    }
  ) do
    post 'generate_otp', to: 'auth#generate_otp'
    post 'login', to: 'auth#login'
    post 'signup', to: 'auth#signup'
    post 'validate_otp', to: 'auth#validate_otp'
    get 'stores/:id/available_slots', to: 'stores#available_slots'
    resources :stores, only: [:index, :show] do
      resources :e_tokens, only: [:index, :create]
    end
  end
end
