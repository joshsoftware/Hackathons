class Role < ApplicationRecord

  def self.store_admin
    find_by(name: ROLES[:store_admin])
  end

  def self.consumer
    find_by(name: ROLES[:consumer])
  end
end
