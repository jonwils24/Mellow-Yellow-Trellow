TrelloClone.Views.CardShow = Backbone.CompositeView.extend({
  template: JST['cards/show'],
  
  className: 'card-display list-group-item',
  
  tagName: 'li',
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function () {
    var content = this.template({
      card: this.model
    });
    
    this.$el.html(content);
    this.$el.attr('data-card-id', this.model.get('id'));
    
    return this;
  }
});