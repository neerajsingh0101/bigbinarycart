$(function(){

  window.Product = Backbone.Model.extend({
    defaults: { name: 'name missing' },
    urlRoot: '/product'
  });

  window.ProductList = Backbone.Collection.extend({
    model: Product,
    url: '/products.json'
  });

  window.ProductViewForListing = Backbone.View.extend({
    initialize: function() {
      this.template = $('#productTmplForListing').template(),
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
    el: $('#main'),
    initialize: function(){
      _.bindAll(this, 'render');
      this.render();
    },
    render: function(){
      self.el.append($('Hello world'));
    }
  });

  window.AppView = Backbone.View.extend({
    el: $('#products'),
    events: {
      "click .product": "showProduct"
    },
    initialize: function(){
      _.bindAll(this, 'render');
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
      var href = $(e.target).closest('.product').find('a').attr('href');
      alert(href);
    }
  });

  var products = new ProductList();
  products.fetch({
    success: function() {
      new AppView({ collection: products });
    }
  });

});
