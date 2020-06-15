# frozen_string_literal: true

class Meet < ApplicationRecord
  MEET_DOMAIN = "meet.jit.si"

  validates :room, presence: true
  validates :room, uniqueness: true
end
