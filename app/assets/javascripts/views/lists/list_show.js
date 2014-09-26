TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  
  className: 'list-display',
  
  events: {
    'submit .card-form': 'createCard',
    'click .card-modal': 'displayModal'
  },
  
  initialize: function () {
    this.collection = this.model.cards();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addCard);
    this.listenTo(this.collection, 'remove', this.removeCard);
  },
  
  addCard: function (card) {
    var cardShow = new TrelloClone.Views.CardShow({
      model: card
    });
    this.addSubview("#cards", cardShow);
  },
  
  displayModal: function (event) {
    event.preventDefault();
    this.$('.cardModal').modal('show');
  },
  
  createCard: function(event) {
    event.preventDefault();
    var $form = $(event.target);
    var data = $form.serializeJSON();
    data.card.list_id = this.model.get('id');
    this.collection.create(data.card, {
      success: function() {
        this.$('.cardModal').modal('hide'); 
        this.$('.cardTitle').val('');//does not work
      },
      wait: true
    })
    // this.$('.cardModal').on('hidden.bs.modal', function (e) {
    // });
  },
  
  render: function () {
    var content = this.template({
      list: this.model
    });
    
    this.$el.html(content);
    this.$el.data('list-id', this.model.id);
    this.renderCards();
    
    return this;
  },
  
  renderCards: function () {
    this.model.cards().each(this.addCard.bind(this));
    this.$('#cards').sortable();
  },
  
  removeCard: function (card) {
    var subview = _.find(this.subviews("#lists"),
    function (subview) {
      return subview.model === card;
    });
    
    this.removeSubview("#cards", subview);
  }
});

























