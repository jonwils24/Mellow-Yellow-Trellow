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
      $('.video').addClass('rollOut');
      $('.video').removeClass('rollIn');
      setTimeout(function() {
        $element.removeClass('animated rollIn');
        $('.video').removeClass('.rollOut');
      }, 800);
    } else {
      $element.addClass('animated rollOut');
      $('.video').removeClass('rollOut hidden');
      $('.video').addClass('rollIn');
      $('div.html5-video-player').removeClass('cued-mode');
      $('div.html5-video-player').addClass('playing-mode');
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