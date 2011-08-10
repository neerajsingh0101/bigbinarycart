Backbonecart::Application.routes.draw do

  get "home/index"

  resources :products
  resource :cart,     :controller => 'cart',      :only => [:show, :create, :update, :destroy]
  resource :checkout, :controller => 'checkout',  :only => [:show]

  root :to => "home#index"

end
