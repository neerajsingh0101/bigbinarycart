class CheckoutController < ApplicationController
  
  def show
    # to reset the shopping cart
    reset_session

    redirect_to root_path, :notice => 'Thanks for the purchase. Enjoy !!!'
  end
  
end
