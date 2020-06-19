class Subscription < ApplicationRecord
  validates :type, presence: true
  validates :type, inclusion: {in: ['Gold', 'Silver','Bronze']}
  belongs_to :company
end
