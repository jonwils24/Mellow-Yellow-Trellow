TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  
  className: 'list-display',
  
  events: {
    'submit .card-form': 'createCard',
    'submit .list-update-form': 'updateList',
    'click .card-modal': 'displayModal',
    'click .list-options': 'displayListOptions',
    'sortstop': 'saveCardOrd',
    'sortremove #cards': 'removeCard',
    'sortreceive #cards': 'receiveCard'
  },
  
  initialize: function () {
    this.collection = this.model.cards();
    this.listenTo(this.model, 'change:title', this.hideModal);
    this.listenTo(this.collection, 'add', this.addCard);
    this.listenTo(this.collection, 'remove', this.removeCardView);
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
  
  // deleteList: function () {
//     this.model.destroy();
//     this.hideModal();
//   },
  
  displayModal: function () {
    this.$('.cardModal').modal('show');
  },
  
  displayListOptions: function () {
    var that = this;
    var board_id = this.model.get('board_id');
    this.$('.listOptionsModal').modal('show');
    $('.delete-list').confirmation({
      placement: 'top',
      href: '#/boards/' + board_id,
      onConfirm: function () {
        that.hideModal();
        that.model.destroy();
      }
    });
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
    }.bind(this));
    this.subviews()[".card-display"]=_.sortBy(this.subviews()[".card-display"], function(subview){
      return subview.model.attributes.ord;
    });
    this.collection.sort()
  },
  
  receiveCard: function(event, ui) {
    var $cardDisplay = ui.item;
    var cardId = $cardDisplay.data('card-id');
    var newOrd = $cardDisplay.index();
    var cardClone = new TrelloClone.Models.Card({
      id: cardId,
      list_id: this.model.id,
      ord: newOrd
    });
    cardClone.save();
    this.collection.add(cardClone, {silent: true});
    this.saveCardOrd(event);
  },

  removeCard: function(event, ui) {
    var $cardDisplay = ui.item;
    var cardId = $cardDisplay.data('card-id');
    var cards = this.model.cards();
    var cardToRemove = cards.get(cardId);
    var cardSubviews = this.subviews('#cards');
    this.collection.remove(cardToRemove, {silent: true});
    // this.removeCardView(cardToRemove);
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
        $form.find('.cardTitle').val('');
        $form.find('.cardContent').val('');
      }.bind(this),
      wait: true
    })
  },
  
  render: function () {
    var content = this.template({
      list: this.model,
      board: this.model.collection.board
    });
    console.log("rendering card");
    this.$el.html(content);
    this.$el.attr('data-list-id', this.model.id);
    this.attachSubviews();
    this.sortableizeCards();
    return this;
  },
  
  sortableizeCards: function(){
    this.$('#cards').sortable({
      connectWith: '.sortable-group',
      dropOnEmpty: true
    });
  },
  
  removeCardView: function (card) {
    var subview = _.find(
      this.subviews("#cards"), function (subview) {
      return subview.model === card;
    });
    
    this.removeSubview("#cards", subview);
  }
});

























