$(function(){

  window.Product = Backbone.Model.extend({
    defaults: { name: 'name missing' },
    urlRoot: '/products'
  });

  window.ProductsList = Backbone.Collection.extend({
    model: Product,
    url: '/products'
  });

  window.LineItem = Backbone.Model.extend({ });

  window.LineItemsList = Backbone.Collection.extend({
    model: LineItem,
    url: '/cart'
  });

  window.CartView = Backbone.View.extend({
    template: $('#cartTmpl').template(),
    initialize: function(){
      _.bindAll(this, 'render');
    },
    render: function(){
      var fragment = $.tmpl(this.template);
      $(this.el).html(fragment);
      return this;
    }
  });

  window.LineItemView = Backbone.View.extend({
    template: $('#lineItemTmpl').template(),
    tagName: 'tbody',
    initialize: function(){
      _.bindAll(this, 'render');
    },
    render: function(){
        var fragment = $.tmpl(this.template, this.model.toJSON());
        $(this.el).html(fragment);
      return this;
    }
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
    className: 'gallery',
    initialize: function(){
      _.bindAll(this, 'render');
      this.render();
    },
    render: function(){
      var fragment = $.tmpl(this.template, this.model.toJSON());
      $(this.el).html(fragment);
      return this;
    },
    events: {
      "click #productDetails a": "addToCart"
    },
    addToCart: function(e){
      var productId = $('#productDetails p.cart a').attr('data-product-id');
      $.ajax({
         type: "POST",
         url: "/cart",
         data: "product_id="+productId,
         success: function(msg){
          window.App.navigate('cart', true);
          return false;
         }
       });

      return false;
    }
  });

  window.HeaderViewForPage = Backbone.View.extend({
    template: $('#headerTmplForPage').template(),
    id: 'header',
    initialize: function(){
      _.bindAll(this, 'render');
    },
    render: function(){
      var fragment = $.tmpl(this.template);
      $(this.el).html(fragment);
      return this;
    }
  });


  window.AppView = Backbone.View.extend({
    initialize: function(){
      _.bindAll(this, 'render', 'showProduct');
    },
    renderHeader: function(){
      $('#header').remove();
      var _view = new HeaderViewForPage({}), _fragment = _view.render().el;
      $('#container').prepend(_fragment);
    },
    render: function(){
      this.renderHeader();

      var targetElement = $("<div id='products'></div>");
      var self = this;
      this.collection.each(function(product){
        var view = new ProductViewForListing({model: product}),
            fragment = view.render().el;
        targetElement.append(fragment);
      });
      $('#main').html(targetElement);
    },
    showProduct: function(id){
      this.renderHeader();

      var product = new Product({id: id}), self = this;
      product.fetch({
        success: function(){
          var mainElement = $('#main'),
              view = new ProductViewForShow({model: product});
          mainElement.html( view.render().el);
        },
        error: function(){ alert('error getting product details'); }
      });
      return false;
    }
  });

  window.products = new ProductsList();
  window.lineItems = new LineItemsList();

  window.AppRouter = Backbone.Router.extend({
    initialize: function(){
    },
    routes: {
      '': 'home',
      'products/:id': 'showProduct',
      'cart': 'showCart'
    },
    home: function(){
      var self = this;
      window.products.fetch({
        success: function(){
          self.appView = new AppView({ collection: window.products });
          self.appView.render();
        }
      });
    },
    showProduct: function(id){
      self.appView = new AppView({ collection: {} });
      self.appView.showProduct(id);
    },
    showCart: function(){
      window.lineItems.fetch({
        success: function(data){
          var cartView = new CartView({}), cartFragment = $(cartView.render().el);
          window.lineItems.each(function(lineItem){
            lineItemView = new LineItemView({model: lineItem});
            lineItemFragment = lineItemView.render().el;
            $(cartFragment).find('table').append(lineItemFragment);
          });

          $('#content').html(cartFragment);
          return false;
        }
      });
      return false;
    }
  });

  window.App = new window.AppRouter();
  Backbone.history.start({pushState: false});

});
