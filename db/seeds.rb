# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# ActiveRecord::Base.transaction do
#   guest = User.create!(email: 'guest@gmail.com', password: 'password')
#
#   guestBoard = guest.boards.create(title: 'Final Project')
# end


guest = User.create(email: 'guest@gmail.com', password: 'password')
member1 = User.create(email: 'member1@gmail.com', password: 'password')
member2 = User.create(email: 'member2@gmail.com', password: 'password')

guestBoard1 = guest.boards.create(title: 'These are boards')
guestBoard4 = guest.boards.create(title: 'These are boards you own or are a member of')
guestBoard2 = guest.boards.create(title: 'Click + in the header to create a board')
guestBoard3 = member1.boards.create(title: 'This is a board you are a member of')

guestBoardList1 = guestBoard1.lists.create(title: 'These are lists')
guestBoardList2 = guestBoard1.lists.create(title: 'List1', ord: 1)
guestBoardList3 = guestBoard1.lists.create(title: 'List2', ord: 2)

guestBoardListCard1 = guestBoardList1.cards.create(title: 'These are cards')
guestBoardListCard2 = guestBoardList1.cards.create(title: 'Click the list settings icon to edit/delete list', ord: 1)
guestBoardListCard3 = guestBoardList1.cards.create(title: 'Click the card gear icon to edit/delete card', ord: 2)
guestBoardListCard4 = guestBoardList1.cards.create(title: 'Lists can be dragged into a new position', ord: 3)
guestBoardListCard5 = guestBoardList1.cards.create(title: 'Cards can be dragged into a new position or into a new list', ord: 4)
guestBoardListCard12 = guestBoardList2.cards.create(title: 'Click on Mellow-Yellow-Trellow to go back to the board index page')
guestBoardListCards6 = guestBoardList2.cards.create(title: 'Click the Board Members box to see who is a member of this board', ord: 1)
guestBoardListCards7 = guestBoardList2.cards.create(title: 'Board owners can add/delete board members', ord: 2)
guestBoardListCards8 = guestBoardList3.cards.create(title: 'Have you found all the Easter Eggs?')
guestBoardListCards9 = guestBoardList3.cards.create(title: 'There are 3 on this page; 4 total on the site', ord: 1)
guestBoardListCards10 = guestBoardList3.cards.create(title: 'Check this cards content to find the easter egss', ord: 2, content: 'Click on the name of the board; Click on the owner of the board; Click on the email in the heading; Click Mellow-Yellow-Trellow to go back to board index page and click Boards')

guestBoardList4 = guestBoard4.lists.create(title: 'These are lists')
guestBoardList5 = guestBoard4.lists.create(title: 'List1', ord: 1)
guestBoardList6 = guestBoard4.lists.create(title: 'List2', ord: 2)

guestBoardListCard11 = guestBoardList4.cards.create(title: 'These are cards')
guestBoardListCard21 = guestBoardList4.cards.create(title: 'Click the list settings icon to edit/delete list', ord: 1)
guestBoardListCard31 = guestBoardList4.cards.create(title: 'Click the card gear icon to edit/delete card', ord: 2)
guestBoardListCard41 = guestBoardList4.cards.create(title: 'Lists can be dragged into a new position', ord: 3)
guestBoardListCard51 = guestBoardList4.cards.create(title: 'Cards can be dragged into a new position or into a new list', ord: 4)
guestBoardListCard121 = guestBoardList5.cards.create(title: 'Click on Mellow-Yellow-Trellow to go back to the board index page')
guestBoardListCards61 = guestBoardList5.cards.create(title: 'Click the Board Members box to see who is a member of this board', ord: 1)
guestBoardListCards71 = guestBoardList5.cards.create(title: 'Board owners can add/delete board members', ord: 2)
guestBoardListCards81 = guestBoardList6.cards.create(title: 'Have you found all the Easter Eggs?')
guestBoardListCards91 = guestBoardList6.cards.create(title: 'There are 3 on this page; 4 total on the site', ord: 1)
guestBoardListCards101 = guestBoardList6.cards.create(title: 'Check this cards content to find the easter egss', ord: 2, content: 'Click on the name of the board; Click on the owner of the board; Click on the email in the heading; Click Mellow-Yellow-Trellow to go back to board index page and click Boards')

guestBoardList7 = guestBoard2.lists.create(title: 'These are lists')
guestBoardList8 = guestBoard2.lists.create(title: 'List1', ord: 1)
guestBoardList9 = guestBoard2.lists.create(title: 'List2', ord: 2)

guestBoardListCard111 = guestBoardList7.cards.create(title: 'These are cards')
guestBoardListCard211 = guestBoardList7.cards.create(title: 'Click the list settings icon to edit/delete list', ord: 1)
guestBoardListCard311 = guestBoardList7.cards.create(title: 'Click the card gear icon to edit/delete card', ord: 2)
guestBoardListCard411 = guestBoardList7.cards.create(title: 'Lists can be dragged into a new position', ord: 3)
guestBoardListCard511 = guestBoardList7.cards.create(title: 'Cards can be dragged into a new position or into a new list', ord: 4)
guestBoardListCard1211 = guestBoardList8.cards.create(title: 'Click on Mellow-Yellow-Trellow to go back to the board index page')
guestBoardListCards611 = guestBoardList8.cards.create(title: 'Click the Board Members box to see who is a member of this board', ord: 1)
guestBoardListCards711 = guestBoardList8.cards.create(title: 'Board owners can add/delete board members', ord: 2)
guestBoardListCards811 = guestBoardList9.cards.create(title: 'Have you found all the Easter Eggs?')
guestBoardListCards911 = guestBoardList9.cards.create(title: 'There are 3 on this page; 4 total on the site', ord: 1)
guestBoardListCards1011 = guestBoardList9.cards.create(title: 'Check this cards content to find the easter egss', ord: 2, content: 'Click on the name of the board; Click on the owner of the board; Click on the email in the heading; Click Mellow-Yellow-Trellow to go back to board index page and click Boards')

guestBoardList10 = guestBoard3.lists.create(title: 'These are lists')
guestBoardList11 = guestBoard3.lists.create(title: 'List1', ord: 1)
guestBoardList12 = guestBoard3.lists.create(title: 'List2', ord: 2)

guestBoardListCard1111 = guestBoardList10.cards.create(title: 'These are cards')
guestBoardListCard2111 = guestBoardList10.cards.create(title: 'Click the list settings icon to edit/delete list', ord: 1)
guestBoardListCard3111 = guestBoardList10.cards.create(title: 'Click the card gear icon to edit/delete card', ord: 2)
guestBoardListCard4111 = guestBoardList10.cards.create(title: 'Lists can be dragged into a new position', ord: 3)
guestBoardListCard5111 = guestBoardList10.cards.create(title: 'Cards can be dragged into a new position or into a new list', ord: 4)
guestBoardListCard12111 = guestBoardList11.cards.create(title: 'Click on Mellow-Yellow-Trellow to go back to the board index page')
guestBoardListCards6111 = guestBoardList11.cards.create(title: 'Click the Board Members box to see who is a member of this board', ord: 1)
guestBoardListCards7111 = guestBoardList11.cards.create(title: 'Board owners can add/delete board members', ord: 2)
guestBoardListCards8111 = guestBoardList12.cards.create(title: 'Have you found all the Easter Eggs?')
guestBoardListCards9111 = guestBoardList12.cards.create(title: 'There are 3 on this page; 4 total on the site', ord: 1)
guestBoardListCards10111 = guestBoardList12.cards.create(title: 'Check this cards content to find the easter egss', ord: 2, content: 'Click on the name of the board; Click on the owner of the board; Click on the email in the heading; Click Mellow-Yellow-Trellow to go back to board index page and click Boards')


boardMember1 = BoardMembership.create(user_id: 2, board_id: 1)
boardMember2 = BoardMembership.create(user_id: 3, board_id: 1)
boardMember3 = BoardMembership.create(user_id: 1, board_id: 4)


