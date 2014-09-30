json.(@board, :id, :title, :created_at, :updated_at)

json.members @board.members do |member|
  json.id member.id
  json.email member.email
end

json.lists @board.lists.order(:ord) do |list|
  json.(list, :id, :title, :ord, :created_at, :updated_at)
  
  json.cards list.cards do |card|
    json.(card, :id, :title, :ord, :content, :created_at, :updated_at)
  end
end