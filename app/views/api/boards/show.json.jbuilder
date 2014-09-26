json.(@board, :id, :title, :created_at, :updated_at)

# json.lists @board.lists, :id, :title, :ord, :created_at, :updated_at

# json.cards @board.lists.cards, :id, :title, :ord, :content, :created_at, :updated_at

json.lists @board.lists do |list|
  json.(list, :id, :title, :ord, :created_at, :updated_at)
  
  json.cards list.cards do |card|
    json.(card, :id, :title, :ord, :content, :created_at, :updated_at)
  end
end