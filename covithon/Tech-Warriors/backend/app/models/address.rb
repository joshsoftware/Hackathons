class Address < ApplicationRecord
  belongs_to :addressable, polymorphic: true

  def as_json(options = {})
    super(options.merge(except: [:created_at, :updated_at]))
  end
end
