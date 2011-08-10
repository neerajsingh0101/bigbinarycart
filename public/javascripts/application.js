$(function(){

  window.Product = Backbone.Model.extend({
    defaults: { name: 'name missing' }
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

  window.productsListView = Backbone.View.extend({
    el: $('#products'),

    //events: {
      //"click .product": "showProduct"
    //},

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
    }

  });



  var WorkspaceRouter = Backbone.Router.extend({
    routes: {
      "products/:id": "showProduct"
    },
    showProduct: function(){
      alert('showing product');
    }
  });
  new WorkspaceRouter();
  Backbone.history.start({pushState: true});

  var products = new ProductList();
  products.fetch({
    success: function() {
      new productsListView({ collection: products });
    }
  });

});
