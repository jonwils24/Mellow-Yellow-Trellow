TrelloClone.Views.Navbar = Backbone.View.extend({
  template: JST["navbar/navbar"],
  
  events: {
    'submit .board-form': 'createBoard',
    'click .add-board': 'displayModal',
    'click div.email': 'zoom'
  },
  
  createBoard: function(event){
    event.preventDefault();
    var that = this;
    var $form = $(event.target);
    var data = $form.serializeJSON();
    
    TrelloClone.Collections.boards.create(data, {
      success: function(){ 
        var board_id = TrelloClone.Collections.boards.last().get('id');
        that.$('.boardModal').modal('hide');
        that.$('.boardTitle').val('');
        // Backbone.history.navigate("#/boards/" + board_id, {trigger: true});
        Backbone.history.navigate("#", {trigger: true});
        
      },
      wait: true
    })
  },
  
  zoom: function () {
    $element = $('div#content');
    
    if ($element.hasClass('rollOut')) {
      $element.addClass('rollIn');
      $element.removeClass('rollOut');
      setTimeout(function() {
        $element.removeClass('animated rollIn');
      }, 500);
    } else {
      $element.addClass('animated rollOut');
    }
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