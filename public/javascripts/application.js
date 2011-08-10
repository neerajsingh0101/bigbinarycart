$(function(){

  window.Product = Backbone.Model.extend({
    defaults: { name: 'name missing' },
    urlRoot: '/products'
  });

  window.ProductList = Backbone.Collection.extend({
    model: Product,
    url: '/products.json'
  });

  window.ProductViewForListing = Backbone.View.extend({
    template: $('#productTmplForListing').template(),
    initialize: function() {
      _.bindAll(this, 'render');
    },
    className: 'product',
    render: function(){
      var fragment = $.tmpl(this.template, this.model.toJSON());
      $(this.el).html(fragment);
      return this;
    }
  });

  window.ProductViewForShow = Backbone.View.extend({
    template: $('#productTmplForShow').template(),
    initialize: function(){
      _.bindAll(this, 'render');
      this.render();
    },
    render: function(){
      var fragment = $.tmpl(this.template, this.model.toJSON());
      $(this.el).html(fragment);
      return this;
    }
  });

  window.AppView = Backbone.View.extend({
    el: $('#products'),
    events: {
      "click .product": "showProduct"
    },
    initialize: function(){
      _.bindAll(this, 'render', 'showProduct');
      this.render();
    },
    render: function(){
      var self = this;
      this.collection.each(function(product){
        var view = new ProductViewForListing({model: product});
        self.el.append(view.render().el);
      });
    },
    showProduct: function(e){
      var id = $(e.target).closest('.product').find('a:first').attr('data-id'),
          product = new Product({id: id}),
          self = this;

      product.fetch({
        success: function(){ console.log(product);
                   var mainElement = self.el.closest('#main'),
                       view = new ProductViewForShow({model: product});
                   mainElement.find('#products').html('');
                   self.el.append(view.render().el);
                 },
        error: function(){ alert('error getting product details'); }
      });
      return false;
    }
  });

  var products = new ProductList();
  products.fetch({
    success: function() {
      new AppView({ collection: products });
    }
  });

});
