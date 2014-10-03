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
    data.list.ord = this.model.lists().length; //sets list ord
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
        // alert("invalid");
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
    //this puts the lists back in the page
    this.attachSubviews();
    //we need to call $sortable on all of the lists' cards after
    this.sortableizeLists();
    this.$('#lists').sortable();
    console.log(this.model.get('user_id'));
    if(!(this.model.get('user_id') === TrelloClone.currentUserId)) {
      this.$el.addClass('not-owner');
    } else {
      this.$el.removeClass('not-owner');
    }
    console.log('rendering board show')
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