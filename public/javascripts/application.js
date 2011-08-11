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
    showProduct: function(id){
      var product = new Product({id: id}), self = this;
      product.fetch({
        success: function(){
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

  window.AppRouter = Backbone.Router.extend({
    initialize: function(view){
      var appView = view;
    },
    routes : {
      'products/:id': 'showProduct'
    },
    showProduct: function(id){
      window.App.appView.showProduct(id);
    }
  });

  window.App = {
    appView: undefined,

    init: function() {
      var products = new ProductList(), self = this;
      products.fetch({
        success: function() {
          self.appView = new AppView({ collection: products });
          this.router = new AppRouter();
          Backbone.history.start(self.appView);
        }
      });
    }
  };

  window.App.init();

});
