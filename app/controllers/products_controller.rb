class ProductsController < ApplicationController

  respond_to :json

  def index
    @products = Product.where(:active => true).order(:name)
    respond_with @products
  end

  def show
    @product = Product.find(params[:id])
    respond_with @product
  end

end
