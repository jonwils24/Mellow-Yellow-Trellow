module Api
  class CardsController < ApiController
    def show
      @card = Card.find(params[:id])
      render json: @card
    end
    
    def create
      card = Card.new(card_params)
      
      if card.save
        render json: card
      else
        render json: card.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    def update
      card = Card.find(params[:id])
      
      if card.update_attributes(card_params)
        render json: card
      else
        render json: card.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    def destroy
      card = Card.find(params[:id])
      card.destroy
      render json: {}
    end
    
    private
    
    def card_params
      params.require(:card).permit(:title, :list_id, :ord, :content)
    end
  end
end