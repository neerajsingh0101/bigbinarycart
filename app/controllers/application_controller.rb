class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_order
  
  protected
  
  def current_order
    @current_order ||= begin
      Order.find_by_id(session[:order_id]) ||
      Order.create!.tap { |order| session[:order_id] = order.id }
    end
  end

end
