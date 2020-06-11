# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :cors_set_access_control_headers
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def cors_preflight_check
    if request.method == 'OPTIONS'
      cors_set_access_control_headers
      render text: '', content_type: 'text/plain'
    end
  end

  private

  def record_not_found
    render_error_response(['Record not found!'], :not_found)
  end

  def status_code
    { success: 200, not_found: 404, error: 400, forbidden: 403, unauthorized: 401 }
  end

  def render_success_response(message, data = nil)
    render json: { message: message, data: data }, status: status_code[:success]
  end

  def render_error_response(errors, type)
    render json: { errors: errors }, status: status_code[type]
  end

  # :reek:FeatureEnvy:
  def render_result(klass, params)
    outcome = klass.run(params)
    return render_success_response('Success!', outcome.result) if outcome.valid?

    render_error_response(outcome.errors.full_messages, :error)
  end

  def render_serialized_result(serializer_class, data, options = {})
    render json: serializer_class.new(data, options).serialized_json
  end

  def cors_set_access_control_headers
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token, Auth-Token, Email, X-User-Token, X-User-Email'
    response.headers['Access-Control-Max-Age'] = '1728000'
  end
end
