module Api
  class BoardsController < ApiController
    def index
      @boards = current_user.boards
      render json: @boards
    end
    
    def show
      @board = current_user.boards.find(params[:id])
      render :show
    end
    
    def create
      board = current_user.boards.new(board_params)
      
      if board.save
        render json: board
      else
        render json: board.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    def update
      board = current_user.boards.find(params[:id])
      
      if board.update_attributes(params[:board])
        render json: board
      else
        render json: board.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    def destroy
      board = current_user.boards.find(params[:id])
      board.try(:destroy)
      render json: @boards
    end
    
    private
    
    def board_params
      params.require(:board).permit(:title)
    end
  end
end