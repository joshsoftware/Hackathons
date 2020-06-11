class JwtService
  JWT_ALGORITHM = 'HS256'.freeze

  def self.encode(user)
    payload = {
      id: user.id,
      role: user.role.name,
      exp: Time.current.to_i + AUTH_TOKEN_EXPIRY
    }

    JWT.encode(
      payload,
      Rails.application.credentials.auth[:jwt_secret],
      JWT_ALGORITHM
    )
  end

  def self.decode(token)
    JWT.decode(
      token,
      Rails.application.credentials.auth[:jwt_secret],
      true,
      { algorithm: JWT_ALGORITHM }
    )
  end
end
