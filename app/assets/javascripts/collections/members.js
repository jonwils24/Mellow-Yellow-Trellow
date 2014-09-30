TrelloClone.Collections.Members = Backbone.Collection.extend({
  comparator: 'email',
  model: TrelloClone.Models.Member,
  
  initialize: function (models, options) {
    this.board = options.board
  }
});
