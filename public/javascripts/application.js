$(function(){

  window.AppView = Backbone.View.extend({
    el: $("#products"),

    initialize: function(){
      Products.bind('reset', this.addAll, this);
      Products.fetch();
    },

    addOne: function(product){
      var view = new ProductView({model: product});
      this.$('#products-list').append(view.render().el);
    },

    addAll: function(){
      Products.each(this.addOne);
    }
  });

  window.app = new AppView;

});
