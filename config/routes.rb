TrelloClone::Application.routes.draw do
  root to: 'static_pages#root'
  
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]
  
  namespace :api, defaults: { format: :json } do
    resources :boards, except: [:new, :edit]
    resources :lists
  end
end
