TrelloClone.Views.MemberShow = Backbone.CompositeView.extend({
  template: JST['board_members/show'],
  
  events: {
    'click .delete-member': 'deleteMember'
  },
  
  render: function () {
    var content = this.template({
      member: this.model,
    });
    
    this.$el.html(content);
    return this;
  },
  
  sortableizeCards: function(){
  },
  
  deleteMember: function() {
    this.model.destroy();
  }
});