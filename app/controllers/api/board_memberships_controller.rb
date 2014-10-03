module Api
  class BoardMembershipsController < ApiController
    def create
      user = User.find_by_email(params[:email])
      
      if user
        user_id = user.id
      
        @membership = BoardMembership.new(board_id: member_params[:board_id], user_id: user_id)
      
        if @membership.save
          render json: @membership
        else
          render json: @membership.errors.full_messages, status: :unprocessable_entity
        end
      end
    end
    
    def destroy
      membership = BoardMembership.find(params[:id])
      membership.destroy
      render json: {}
    end
    
    private
    
    def member_params
      params.require(:board_membership).permit(:board_id, :user_id, :email)
    end
  end
end