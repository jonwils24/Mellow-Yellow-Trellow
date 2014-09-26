module Api
  class ListsController < ApiController
    def show
      @list = List.find(params[:id])
      render json: @list
    end
    
    def create
      list = List.new(list_params)
            
      if list.save
        render json: list
      else
        render json: list.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    def update
      list = List.find(params[:id])
      
      if list.update_attributes(list_params)
        render json: list
      else
        render json: list.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    def destroy
      list = List.find(params[:id])
      list.destroy
      render json: {}
    end
    
    private
    
    def list_params
      params.require(:list).permit(:title, :board_id, :ord)
    end
  end
end