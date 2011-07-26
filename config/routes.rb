Backbonecart::Application.routes.draw do

  resources :products
  resource :cart,     :controller => 'cart',      :only => [:show, :create, :update, :destroy]
  resource :checkout, :controller => 'checkout',  :only => [:show]

  root :to => "products#index"

end
