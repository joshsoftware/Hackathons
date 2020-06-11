# frozen_string_literal: true

# == Schema Information
#
# Table name: messages
#
#  id            :bigint           not null, primary key
#  body          :text
#  receiver_type :string
#  sender_type   :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  receiver_id   :bigint
#  sender_id     :bigint
#  token_id      :bigint
#
# Indexes
#
#  index_messages_on_receiver_type_and_receiver_id  (receiver_type,receiver_id)
#  index_messages_on_sender_type_and_sender_id      (sender_type,sender_id)
#  index_messages_on_token_id                       (token_id)
#
class Message < ApplicationRecord
  belongs_to :sender, polymorphic: true
  belongs_to :receiver, polymorphic: true
  belongs_to :token
end
