class Card < ActiveRecord::Base
  validates :title, :list, :ord, presence: true
  
  belongs_to :list
end
