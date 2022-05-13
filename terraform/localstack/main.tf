provider "aws" {
  region                      = "eu-west-2"
  access_key                  = "fake"
  secret_key                  = "fake"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    dynamodb     = "http://localhost:4566"
    lambda       = "http://localhost:4566"
    s3           = "http://localhost:4566"
    apigatewayv2 = "http://localhost:4566"
  }
}

resource "aws_dynamodb_table" "auth_table" {
  name           = "auth"
  read_capacity  = "5"
  write_capacity = "5"
  hash_key       = "UserId"
  range_key      = "Email"

  attribute {
    name = "UserId"
    type = "S"
  }
  attribute {
    name = "Email"
    type = "S"
  }
}
