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
    template: _.template($('#product-view-for-list-template').html()),

    render: function(){

      $(this.el).html(this.template(this.model.toJSON()));

      var name = this.model.get("name"),
          id   = this.model.get("id"),
          price = this.model.get("price"),
          pictureFileName = this.model.get("picture_file_name"),
          fullPathToPicture = '/system/pictures/'+id+'/thumbnail/'+pictureFileName;

      this.$('.productName a').text(name).attr('href', '/products/'+id);
      this.$('.productPrice').text(price);
      this.$('.product img').attr('alt', name).closest('a').attr('href', '/products/'+id);
      this.$('.product img').attr('src', fullPathToPicture);
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
