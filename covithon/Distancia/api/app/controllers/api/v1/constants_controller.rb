# frozen_string_literal: true

class Api::V1::ConstantsController < ApplicationController
  def index
    render_success_response('Success!', {
                              shop_types: SHOP_TYPES
                            })
  end
end
