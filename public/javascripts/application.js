$(function(){

  window.Product = Backbone.Model.extend({
    defaults: {name: 'name missing'}
  });

  window.ProductList = Backbone.Collection.extend({
    model: Product,
    url: '/products.json'
  });


  window.ProductViewForShow = Backbone.View.extend({
    initialize: function() {
                  this.template = _.template("<a href='products/<%= id %>'><img alt='<%= name %>' class='productImage' height='190' src='/system/pictures/<%= id %>/thumbnail/<%= picture_file_name %>' width='190' /></a> <p class='productName'> <%= name %><a href='/products/<%= id %>'></a></p><p class='productPrice'><%= price %></p>");

                  _.bindAll(this, 'render');
                },
    className: 'product',
    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  window.AppView = Backbone.View.extend({
    render: function(){
      var self = this;
      this.collection.each(function(element){
        var view = new ProductViewForShow({model: element});
        self.el.append(view.render().el);
      });
    },
    initialize: function(){
      _.bindAll(this, 'render');
      this.render();
    }
  });

  var products = new ProductList();
  products.fetch({
    success: function() {
      new AppView({ el: $("#products"), collection: products });
    }
  });
});
