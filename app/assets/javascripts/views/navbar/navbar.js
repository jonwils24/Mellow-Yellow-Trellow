TrelloClone.Views.Navbar = Backbone.View.extend({
  template: JST["navbar/navbar"],
  
  events: {
    'submit .board-form': 'createBoard',
    'click .add-board': 'displayModal'
  },
  
  createBoard: function(event){
    event.preventDefault();
    var $form = $(event.target);
    var data = $form.serializeJSON();
    TrelloClone.Collections.boards.create(data, {
      success: function(){ 
        this.$('.boardModal').modal('hide');
        this.$('.boardTitle').val('');
        Backbone.history.navigate("", {trigger: true});
      },
      wait: true
    })
  },
  
  displayModal: function (event) {
    event.preventDefault();
    this.$('.boardModal').modal('show');
  },
  
  render: function(){
    this.$el.html(this.template());
    return this;
  }
});