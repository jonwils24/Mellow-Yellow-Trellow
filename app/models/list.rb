class List < ActiveRecord::Base
  validates :title, :board, :ord, presence: true
  
  belongs_to :board
end
