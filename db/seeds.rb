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

guestBoard1 = guest.boards.create(title: 'Final Project')
guestBoard2 = guest.boards.create(title: 'Send Email')

guestBoardList1 = guestBoard1.lists.create(title: 'New List')
guestBoardList2 = guestBoard1.lists.create(title: 'Second List')

guestBoardListCard1 = guestBoardList1.cards.create(title: 'New Card')
guestBoardListCard2 = guestBoardList1.cards.create(title: 'Second Card')
guestBoardListCard3 = guestBoardList1.cards.create(title: 'Third Card')
guestBoardListCard4 = guestBoardList1.cards.create(title: 'Fourth Card')



