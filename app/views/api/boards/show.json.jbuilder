json.(@board, :id, :title, :created_at, :updated_at)

json.members @board.board_memberships do |membership|
  json.id membership.id
  json.email membership.user.email
  json.user_id membership.user_id
  json.board_id membership.board_id
end

json.lists @board.lists.order(:ord) do |list|
  json.(list, :id, :title, :ord, :created_at, :updated_at)
  
  json.cards list.cards do |card|
    json.(card, :id, :title, :ord, :content, :created_at, :updated_at)
  end
end