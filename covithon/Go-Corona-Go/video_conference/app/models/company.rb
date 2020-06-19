class Company < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :validatable
  # :registerable, :recoverable, :rememberable, 
  has_many :subscriptions
  validates :name, :email, presence: true
  accepts_nested_attributes_for :subscriptions
end
