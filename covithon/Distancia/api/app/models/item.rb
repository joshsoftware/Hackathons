# frozen_string_literal: true

# == Schema Information
#
# Table name: items
#
#  id           :bigint           not null, primary key
#  is_available :boolean          default(TRUE)
#  name         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  token_id     :bigint
#
# Indexes
#
#  index_items_on_token_id  (token_id)
#
class Item < ApplicationRecord
  belongs_to :token
end
