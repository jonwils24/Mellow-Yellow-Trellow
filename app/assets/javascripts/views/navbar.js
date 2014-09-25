TrelloClone.Views.Navbar = Backbone.View.extend({
  template: JST["navbar/navbar"],
  
  events: {'submit .board-form': 'createBoard'},
  
  createBoard: function(event){
    event.preventDefault();
    var $form = $(event.target);
    var data = $form.serializeJSON();
    TrelloClone.Collections.boards.create(data, {
      success: function(){ 
        this.$('#boardModal').modal('hide');
      },
      error: function(){
        alert('something went wrong :(');
      }
    })
  },
  
  render: function(){
    this.$el.html(this.template());
    return this;
  }
});