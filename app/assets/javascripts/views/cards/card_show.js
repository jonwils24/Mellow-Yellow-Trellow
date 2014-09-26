TrelloClone.Views.CardShow = Backbone.CompositeView.extend({
  template: JST['cards/show'],
  
  className: 'card-display',
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function () {
    var content = this.template({
      card: this.model
    });
    
    this.$el.html(content);
    this.$el.data('card-id', this.model.id);
    
    return this;
  }
});