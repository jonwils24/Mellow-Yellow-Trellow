TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  
  className: 'list-display',
  
  events: {
    'submit .card-form': 'createCard',
    'submit .list-update-form': 'updateList',
    'click .card-modal': 'displayModal',
    'click .list-options': 'displayListOptions',
    'sortstop': 'saveCardOrd',
    'click .delete-list': 'deleteList'
  },
  
  initialize: function () {
    this.collection = this.model.cards();
    this.listenTo(this.model, 'change:title', this.hideModal);
    this.listenTo(this.collection, 'add', this.addCard);
    this.listenTo(this.collection, 'remove', this.removeCard);
    this.listenTo(this.model.collection.board, 'sync', this.render);
    this.model.cards().each(this.addCard.bind(this));
  },
  
  addCard: function (card) {
    var cardShow = new TrelloClone.Views.CardShow({
      model: card
    });
    this.addSubview("#cards", cardShow);
  },
  
  updateList: function (event) {
    event.preventDefault();
    var $form = $(event.target);
    var data = $form.serializeJSON();
    this.model.set({title: data.list.title});
    var that = this;
    this.model.save();
  },
  
  hideModal: function() {
    $('.listOptionsModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  },
  
  deleteList: function () {
    this.model.destroy();
    this.hideModal();
  },
  
  displayModal: function (event) {
    event.preventDefault();
    this.$('.cardModal').modal('show');
  },
  
  displayListOptions: function (event) {
    event.preventDefault();
    this.$('.listOptionsModal').modal('show');
  },
  
  saveCardOrd: function (event) {
    event.stopPropagation();
    var itemElements = this.$('.card-display');
    var idAttribute = 'card-id';
    var collection = this.collection;

    itemElements.each(function(index, element) {
      var $itemElement = $(element);
      var itemId = $itemElement.data(idAttribute);
      var item = collection.get(itemId);
      
      item.save({ord: index});
    });
  },
  
  createCard: function(event) {
    event.preventDefault();
    var $form = $(event.target);
    var data = $form.serializeJSON();
    data.card.list_id = this.model.get('id');
    data.card.ord = this.model.cards().length;
    this.collection.create(data.card, {
      success: function() {
        this.$('.cardModal').modal('hide'); 
        this.$('.cardTitle').val('');//does not work
        this.$('.cardContent').val('');
      },
      wait: true
    })
  },
  
  render: function () {
    var content = this.template({
      list: this.model,
      board: this.model.collection.board
    });
    
    this.$el.html(content);
    this.$el.attr('data-list-id', this.model.id);
    this.attachSubviews();
    this.sortableizeCards();
    console.log('rendering list show')
    window.v = this;
    return this;
  },
  
  sortableizeCards: function(){
    this.$('#cards').sortable();
  },
  
  removeCard: function (card) {
    var subview = _.find(
      this.subviews("#cards"), function (subview) {
      return subview.model === card;
    });
    
    this.removeSubview("#cards", subview);
  }
});

























