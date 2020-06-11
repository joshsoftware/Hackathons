class DigitalToken < ApplicationRecord
  belongs_to :user
  belongs_to :store
end
