TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  
  className: 'clearfix',
  
  initialize: function () {
    $('body').css('background-color', '#23719f');
    $('body').css('background-image', '');
    this.collection = this.model.lists();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addList);
    this.listenTo(this.collection, 'remove', this.removeList);
    
    // this.collection.each(this.addList.bind(this));
//     this.$('#lists').sortable();
  },
  
  addList: function (list) {
    var listShow = new TrelloClone.Views.ListShow({
      model: list
    });
    this.addSubview("#lists", listShow);
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