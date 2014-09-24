TrelloClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    '': 'boardsIndex',
    'boards/:id': 'boardShow'
  },
  
  boardsIndex: function () {
    var boards = TrelloClone.Collections.boards;
    boards.fetch();
    var indexView = new TrelloClone.Views.BoardsIndex({
      collection: boards
    });
    this._swapView(indexView);
  },
  
  boardShow: function (id) {
    var board = TrelloClone.Collections.boards.getOrFetch(id);
    var showView = new TrelloClone.Views.BoardShow({ 
      model: board 
    });
    this._swapView(showView);
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});