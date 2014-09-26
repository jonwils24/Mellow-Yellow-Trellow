TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  
  className: 'list-display',
  
  events: {
    'submit .card-form': 'createCard',
    'submit .list-update-form': 'updateList',
    'click .card-modal': 'displayModal',
    'click .list-options': 'displayListOptions',
    'sortstop': 'saveCardOrd',
    'click .delete-list': 'testClick'
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
  
  updateList: function (event) {
    event.preventDefault();
    var $form = $(event.target);
    var data = $form.serializeJSON();
    this.model.set({title: data.list.title});
    var that = this;
    this.model.save({}, {
      success: function() {
        alert("saved");
        that.$('.listOptionsModal').modal('hide');
      },
    });
  },
  
  testClick: function () {
    alert("testing the click")
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
      },
      wait: true
    })
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

























