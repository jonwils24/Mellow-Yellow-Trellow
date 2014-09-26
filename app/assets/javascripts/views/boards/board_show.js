TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  
  className: 'clearfix',
  
  events: {
    'submit .list-form': 'createList',
    'click .list-modal': 'displayModal',
    'sortstop': 'saveListOrd'
  },
  
  initialize: function () {
    $('body').css('background-color', '#23719f');
    $('body').css('background-image', '');
    this.collection = this.model.lists();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addList);
    this.listenTo(this.collection, 'remove', this.removeList);
    
 
  },
  
  addList: function (list) {
    var listShow = new TrelloClone.Views.ListShow({
      model: list
    });
    this.addSubview("#lists", listShow);
  }, 
  
  saveListOrd: function () {
    var itemElements = this.$('.list-display');
    var idAttribute = 'list-id';
    var collection = this.collection;
    
    itemElements.each(function(index, element) {
      var $itemElement = $(element);
      var itemId = $itemElement.data(idAttribute);
      var item = collection.get(itemId);
      
      item.save({ord: index});
    });
  },
  
  displayModal: function (event) {
    event.preventDefault();
    this.$('.listModal').modal('show');
  },
  
  createList: function(event) {
    event.preventDefault();
    var $form = $(event.target);
    var data = $form.serializeJSON();
    data.list.board_id = this.model.get('id');
    data.list.ord = this.model.lists().length; //sets list ord
    this.collection.create(data.list, {
      success: function() {
        this.$('.listModal').modal('hide');
        this.$('.listTitle').val('');
      },
      wait: true
    })
  },
  
  render: function () {
    var content = this.template({
      board: this.model
    });
    
    this.$el.html(content);
    // this.attachSubviews();
    this.renderLists();
    
    return this;
  },
  
  renderLists: function () {
    this.model.lists().each(this.addList.bind(this));
    this.$('#lists').sortable();
  },
  
  removeList: function (list) {
    var subview = _.find(
      this.subviews("#lists"),
      function (subview) {
        return subview.model === list;
      });
      
    this.removeSubview("#lists", subview);
  }
});