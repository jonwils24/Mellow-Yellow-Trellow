window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  
  initialize: function() {
    new TrelloClone.Routers.Router({
      $rootEl: $("#content")
    });
    Backbone.history.start();
  }
};

// $(document).ready(function(){
//   TrelloClone.initialize();
// });