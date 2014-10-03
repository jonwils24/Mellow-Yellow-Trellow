TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  
  className: "clearfix", 
  
  events: {
    'submit .list-form': 'createList',
    'click .list-modal': 'displayListModal',
    'submit .member-form': 'createMember',
    'click .member-modal': 'displayMemberModal',
    'sortstop': 'saveListOrd',
    'click div.show-board-header h1': 'shake',
    'click div.show-board-header h4': 'effect'
  },
  
  initialize: function () {
    this.collection = this.model.lists();
    this.memberCollection = this.model.members();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addList);
    this.listenTo(this.collection, 'remove', this.removeList);
    this.listenTo(this.memberCollection, 'add', this.addMember);
    this.listenTo(this.memberCollection, 'remove', this.removeMember);
    this.model.lists().each(this.addList.bind(this));
    this.model.members().each(this.addMember.bind(this));
  },
  
  shake: function () {
    $('div.show-board-header h4').effect("shake");
    
    
    $element = $('div.panel');
    $element.addClass('animated');
  
    if ($element.hasClass('zoomOutUp')) {
      $element.addClass('zoomInDown');
      $element.toggleClass('zoomOutUp');
      setTimeout(function() {
        $element.removeClass('zoomInDown');
      }, 500);
    } else {
      $element.addClass('zoomOutUp');
    }
    
    $element2 = $('div button.list-modal');
    $element2.addClass('animated');
  
    if ($element2.hasClass('fadeOutRightBig')) {
      $element2.addClass('fadeInRightBig');
      $element2.toggleClass('fadeOutRightBig');
      setTimeout(function() {
        $element2.removeClass('fadeInRightBig');
      }, 500);
    } else {
      $element2.addClass('fadeOutRightBig');
    }
    
    $element3 = $('div button.dropdown-toggle');
    $element3.addClass('animated');
  
    if ($element3.hasClass('fadeOutRightBig')) {
      $element3.addClass('fadeInRightBig');
      $element3.toggleClass('fadeOutRightBig');
      setTimeout(function() {
        $element3.removeClass('fadeInRightBig');
      }, 500);
    } else {
      $element3.addClass('fadeOutRightBig');
    }
    
  },
  
  effect: function () {
    if ($('i.fa-cog').hasClass('fa-spin')) {
      $('i.fa-cog').toggleClass('fa-spin');
      $('i.fa-cog').effect('bounce');
    } else {
      $('i.fa-cog').effect('bounce');
      setTimeout(function() {
        $('i.fa-cog').toggleClass('fa-spin');
      }, 500);
    }
    
    var $element = $('div button.list-modal');
    $element.addClass('animated');
    $element.toggleClass('rubberBand');
    setTimeout(function() {
      $element.toggleClass('rubberBand');
    }, 500);

    var $element2 = $('div button.dropdown-toggle');
    $element2.addClass('animated');
    $element2.toggleClass('rubberBand');
    setTimeout(function() {
      $element2.toggleClass('rubberBand');
    }, 500);

    var $element3 = $('div.list-display');
    $element3.addClass('animated');
    $element3.toggleClass('rubberBand');
    setTimeout(function() {
      $element3.toggleClass('rubberBand');
    }, 500);
    
    var $element4 = $('div.show-board-header h1');
    $element4.addClass('animated');
    $element4.toggleClass('rubberBand');
    setTimeout(function() {
      $element4.toggleClass('rubberBand');
    }, 500);
    
    
  },
  
  addList: function (list) {
    var listShow = new TrelloClone.Views.ListShow({
      model: list
    });
    this.addSubview("#lists", listShow);
  }, 
  
  addMember: function (member) {
    var memberShow = new TrelloClone.Views.MemberShow({
      model: member
    });
    this.addSubview("#board-members", memberShow);
  },
  
  
  
  saveListOrd: function (event) {
    event.stopPropagation();
    var itemElements = this.$('.list-display');
    var idAttribute = 'list-id';
    var collection = this.collection;
    
    itemElements.each(function(index, element) {
      var $itemElement = $(element);
      var itemId = $itemElement.data(idAttribute);
      var item = collection.get(itemId);
      
      item.save({ord: index});
    }.bind(this));
    this.subviews()[".list-display"]=_.sortBy(this.subviews()[".list-display"], function(subview){
      return subview.model.attributes.ord;
    });
    this.collection.sort()
  },
  
  displayListModal: function (event) {
    event.preventDefault();
    this.$('.listModal').modal('show');
  },
  
  displayMemberModal: function (event) {
    event.preventDefault();
    this.$('.memberModal').modal('show');
  },
  
  createList: function(event) {
    event.preventDefault();
    var $form = $(event.target);
    var data = $form.serializeJSON();
    data.list.board_id = this.model.get('id');
    data.list.ord = this.model.lists().length;
    this.collection.create(data.list, {
      success: function() {
        this.$('.listModal').modal('hide');
        $form.find('.listTitle').val('');
      }.bind(this),
      wait: true
    })
  },
  
  createMember: function(event) {
    event.preventDefault();
    var that = this;
    var $form = $(event.target);
    var data = $form.serializeJSON();
    data.member.board_id = this.model.get('id');
    this.memberCollection.create(data.member, {
      success: function() {
        this.$('.memberModal').modal('hide');
        this.$('.memberEmail').val('');
      }.bind(this),
      error: function() {
        this.$('.invalidMemberModal').modal('show');
      },
      wait: true
    })
  },
  
  render: function () {
    var content = this.template({
      board: this.model
    });
    
    this.$el.html(content);
    this.attachSubviews();
    this.sortableizeLists();
    this.$('#lists').sortable();
    if(!(this.model.get('user_id') === TrelloClone.currentUserId)) {
      this.$el.addClass('not-owner');
    } else {
      this.$el.removeClass('not-owner');
    }
    return this;
  },
  
  sortableizeLists: function(){
    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      _(subviews).each(function (subview) {
        subview.sortableizeCards();
      });
    });
  },
  
  removeList: function (list) {
    var subview = _.find(
      this.subviews("#lists"), function (subview) {
        return subview.model === list;
      }
    );
    this.removeSubview("#lists", subview);
  },
  
  removeMember: function (member) {
    var subview = _.find(
      this.subviews("#board-members"), function (subview) {
        return subview.model === member;
      }
    );
    this.removeSubview("#board-members", subview);
  }  
});