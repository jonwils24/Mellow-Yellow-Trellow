TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST['boards/index'],
  
  className: 'boards-index',
  
  events: {
    'submit .board-form': 'create',
    'click .boards-index-title h1': 'flip'
  },
  
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  flip: function () {
    $(".boards").addClass('animated flip');
    setTimeout(function() {
      $(".boards").removeClass('flip');
      $(".boards").addClass('wobble');
    }, 1000);
    setTimeout(function() {
      $(".boards").removeClass('animated wobble');
    }, 2000);
  },
  
  render: function () {
    var content = this.template({
      boards: this.collection
    });
    
    this.$el.html(content);
    return this;
  }
});