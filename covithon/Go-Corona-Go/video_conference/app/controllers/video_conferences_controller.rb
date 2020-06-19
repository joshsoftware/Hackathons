# frozen_string_literal: true

class VideoConferencesController < ApplicationController
  skip_before_action :authenticate!,  :verify_authenticity_token

  def create

    if (user = User.find_or_create_by(conference_params)) && \
      (video_conference = Meet.create(room: SecureRandom.alphanumeric, password: SecureRandom.hex(4)))

      render(
        json: {
          data: {
            video_conference: {
              room: video_conference.room,
              domain: Meet::MEET_DOMAIN,
              password: video_conference.password,
              user: {
                name: user.name,
                email: user.email,
                avatar_url: user.avatar_url
              }
            }
          },
          message: "Successfully Created Video Conference" },
        status: :ok
      )
    else
      render json: { data: {}, errors: [user.errors.messages, video_conference.errors.messages], message: "Failed to create videoconfernce" }, status: :unprocessable_entity
    end
  end

  private

  def conference_params
    params.require(:user).permit(:name, :email, :avatar_url)
  end
end
