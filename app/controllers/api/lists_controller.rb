module Api
  class ListsController < ApiController
    def index
      @lists = current_board.lists
      render json: @lists
    end
    
    def show
      @list = current_board.lists.find(params[:id])
      render json: @list
    end
    
    def create
      list = current_board.lists.new(list_params)
            
      if list.save
        render json: list
      else
        render json: list.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    def update
      list = current_board.lists.find(params[:id])
      
      if list.update_attributes(list_params)
        render json: list
      else
        render json: list.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    def destroy
      list = List.find(params[:id])
      list.destroy
      render json: current_board
    end
    
    private
    
    def current_board
      list = List.find(params[:id])
      
      if list
        @board = list.board
      else
        @board = Board.find(params[:list][:board_id])
      end
    end
    
    def list_params
      params.require(:list).permit(:title, :board_id, :ord)
    end
  end
end