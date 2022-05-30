provider "aws" {
  region                      = "eu-west-2"
  access_key                  = "fake"
  secret_key                  = "fake"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  s3_use_path_style           = true

  endpoints {
    dynamodb     = "http://localhost:4566"
    lambda       = "http://localhost:4566"
    s3           = "http://localhost:4566"
    apigatewayv2 = "http://localhost:4566"
    iam          = "http://localhost:4566"
  }
}
