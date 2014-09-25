TrelloClone.Views.BoardsNew = Backbone.View.extend({
  template: JST['boards/new'],
  
  events: {
    'submit form': 'submit'
  },
  
  render: function () {
    var content = this.template();
    this.$el.html(content);
    
    return this;
  }
  
  
})