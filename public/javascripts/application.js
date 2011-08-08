$(function(){

  window.Product = Backbone.Model.extend({
    defaults: {name: 'name missing'},

    initialize: function(){}
  });

  window.ProductList = Backbone.Collection.extend({
    model: Product,
    localStorage: new Store('backbonecart')
  });

  window.Products = new window.ProductList;

  window.ProductView = Backbone.View.extend({
    template: _.template($('#product-template').html()),
    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      this.$('.itemName a').text(this.model.get('name'));
      return this;
    }
  });

  window.AppView = Backbone.View.extend({
    el: $("#products"),

    initialize: function(){
      Products.create({name: 'iphone4'});
      Products.bind('reset', this.addAll, this);
      Products.fetch();
    },

    addOne: function(product){
      console.log('addOne is called');
      var view = new ProductView({model: product});
      this.$('#products-list').append(view.render().el);
    },

    addAll: function(){
      console.log('addAll is called');
      Products.each(this.addOne);
    }
  });

  window.app = new AppView;

});
