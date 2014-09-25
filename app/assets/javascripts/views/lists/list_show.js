TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  
  className: 'list-display',
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function () {
    var content = this.template({
      list: this.model
    });
    
    this.$el.html(content);
    this.$el.data('list-id', this.model.id);
    
    return this;
  }
});