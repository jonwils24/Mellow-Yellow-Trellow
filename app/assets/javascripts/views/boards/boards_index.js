TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST['boards/index'],
  
  className: 'boards-index',
  
  events: {
    'submit .board-form': 'create'
  },
  
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  create: function (event) {
    console.log("creating a board");
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    var newBoard = new TrelloClone.Models.Board(params['board']);
    debugger
    newBoard.save({}, {
      success: function () {
        TrelloClone.Collections.boards.add(newBoard);
        Backbone.history.navigate('/boards/' + newBoard.id, { trigger: true });
      }
    });
  },
  
  render: function () {
    var content = this.template({
      boards: this.collection
    });
    
    this.$el.html(content);
    return this;
  }
});