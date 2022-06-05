resource "aws_cognito_user_pool" "user_pool" {
  name = "thom-pool"
}

resource "aws_cognito_user" "thom_user" {
  user_pool_id = aws_cognito_user_pool.user_pool.id
  username     = var.thom_username
  enabled      = true
  password     = var.thom_password
  attributes = {
    email          = var.thom_email
    email_verified = true
  }
  desired_delivery_mediums = ["EMAIL"]
}

resource "aws_cognito_user_pool_client" "user_client" {
  name                = "user-client"
  user_pool_id        = aws_cognito_user_pool.user_pool.id
  explicit_auth_flows = ["ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_PASSWORD_AUTH", "ALLOW_ADMIN_USER_PASSWORD_AUTH"]
}
