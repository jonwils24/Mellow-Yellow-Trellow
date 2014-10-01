TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST['boards/index'],
  
  className: 'boards-index',
  
  events: {
    'submit .board-form': 'create'
  },
  
  initialize: function () {
    // $('body').css('background-color', 'transparent');
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  create: function (event) {
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    var newBoard = new TrelloClone.Models.Board(params['board']);
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