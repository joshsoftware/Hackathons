Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  devise_scope :company do
    root to: 'devise/sessions#new'
  end

  devise_for :companies, :skip => [:registration], controllers: { confirmations: 'confirmation' }
  as :company do
    get 'companies/new' => 'companies#new', :as => 'new_company_registration'
    post 'companies' => 'companies#create', :as => 'company_registration'
  end

  get 'new_meeting', to: 'companies#new_meeting'
  resources :companies, only: [:show]

  resources :video_conferences, only: [:create]
end
