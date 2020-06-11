AUTH_TOKEN_EXPIRY = 8 * 60 * 60
AUTH_HEADER = 'X_AUTH_TOKEN'.freeze
HTTP_AUTH_HEADER = "HTTP_#{AUTH_HEADER}".freeze
APPLICATION_URI = Rails.application.credentials.application[:url]
WHATAPP_PREFIX = "whatsapp:+91"
ROLES = {
  consumer: "CONSUMER",
  store_admin: "STORE ADMIN",
  superadmin: "SUPERADMIN",
}.freeze