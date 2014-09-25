json.(@board, :id, :title, :created_at, :updated_at)
json.lists @board.lists, :id, :title, :ord, :created_at, :updated_at