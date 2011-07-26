class ProductsController < ApplicationController

  respond_to :html, :xml, :json
  
  def index
    @products = Product.where(:active => true).order(:name).paginate(
      :per_page => 12,
      :page     => params[:page]
    )

    respond_with @products
  end
  
  def show
    @product = Product.find(params[:id])

    respond_with @product
  end
  
  def new
    @product  = Product.new
  end
  
  def create
    @product  = Product.new(params[:product])
    if @product.save
      redirect_to(product_url(@product))
    else
      Rails.logger.info @product.errors.full_messages.inspect
      render :action => :new, :status => :unprocessable_entity
    end
  end
  
end
