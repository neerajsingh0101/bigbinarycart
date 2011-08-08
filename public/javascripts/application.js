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

  window.ProductView = Backbone.View.extend({
    template: _.template($('#product-template').html()),

    render: function(){

      $(this.el).html(this.template(this.model.toJSON()));
      var name = this.model.get("name");
      console.log(name);
      console.log(this.model.toJSON());
      this.$('.productName a').text(name);
      return this;
    }
  });

  window.AppView = Backbone.View.extend({
    el: $("#products"),

    initialize: function(){
      //Products.create({name: 'iphone4'});
      Products.bind('reset', this.addAll, this);
      Products.fetch();
    },

    addOne: function(product){
      console.log('addOne is called');
      console.log(product);
      console.log(product.toJSON());
      var view = new ProductView({model: product});
      this.$('#products-list').append(view.render().el);
    },

    addAll: function(){
      console.log('addAll is called');
      console.log(this);
      Products.each(this.addOne);
    }
  });

  window.app = new AppView;

});
