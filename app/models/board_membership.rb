class BoardMembership < ActiveRecord::Base
  validates :user_id, uniqueness: {scope: :board_id}
  
  belongs_to :user
  belongs_to :board
end
