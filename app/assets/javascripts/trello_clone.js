window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  
  initialize: function(options) {
    new TrelloClone.Routers.Router({
      $rootEl: options.$main
    });
    Backbone.history.start();
    
    options.$navbar.html(new TrelloClone.Views.Navbar().render().$el);
  }
};