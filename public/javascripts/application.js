$(function(){

  window.Product = Backbone.Model.extend({
    defaults: {name: 'name missing'},

    initialize: function(){}
  });

  window.ProductList = Backbone.Collection.extend({
    model: Product,
    url: '/products.json'
  });

  window.Products = new window.ProductList;


  window.ProductViewForList = Backbone.View.extend({
    initialize: function() {
      this.template = _.template("<a href='products/<%= id %>'><img alt='<%= name %>' class='productImage' height='190' src='/system/pictures/<%= id %>/thumbnail/<%= picture_file_name %>' width='190' /></a> <p class='productName'> <%= name %><a href='/products/<%= id %>'></a></p><p class='productPrice'><%= price %></p>");

    },
    template: _.template($('#product-view-for-list-template').html()),
    className: 'product',
    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  window.ProductViewForShow = Backbone.View.extend({
    template: _.template($('#product-view-for-show-template').html()),

    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  window.AppView = Backbone.View.extend({
    el: $("#products"),

    events: {
      "click #products-list .product a": "showProduct"
    },

    initialize: function(){
      Products.bind('reset', this.addAll, this);
      Products.fetch();
    },

    showProduct: function(product) {
      var view = new ProductViewForShow({model: product});
      this.$('#content').html(view.render().el);
      return false;
    },

    addOne: function(product){
      var view = new ProductViewForList({model: product});
      var e = view.render().el;
      this.$('#products-list').append(e);
    },

    addAll: function(){
      Products.each(this.addOne);
    }
  });

  window.app = new AppView;

});
