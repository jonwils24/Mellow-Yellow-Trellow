TrelloClone.Views.CardShow = Backbone.CompositeView.extend({
  template: JST['cards/show'],
  
  className: 'card-display list-group-item',
  
  tagName: 'li',
  
  events: {
    'click .card-show-modal': 'displayModal',
    'submit .card-show-form': 'updateCard'
  },
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    window.v = this.$el
  },
  
  render: function () {
    var content = this.template({
      card: this.model,
      list: this.model.collection.list
    });
    
    this.$el.html(content);
    this.$el.attr('data-card-id', this.model.get('id'));
    
    return this;
  },
  
  displayModal: function () {
    var that = this;
    this.$('.cardShowModal').modal('show');    
    $('[data-toggle="confirmation"]').confirmation({
      placement: 'top',
      onConfirm: function () {
        that.hideModal();
        that.model.destroy();
      }
    });
  },
  
  updateCard: function (event) {
    event.preventDefault();
    var $form = $(event.target);
    var data = $form.serializeJSON();
    this.model.set({title: data.card.title, content: data.card.content});
    this.model.save();
    this.hideModal();
  },
  
  hideModal: function() {
    $('.cardShowModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
});






















