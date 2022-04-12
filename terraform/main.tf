terraform {
  required_version = "1.1.7"

  required_providers {
    aws = {
      version = "~> 3.73.0"
      source  = "hashicorp/aws"
    }
    random = {
      version = "3.1.2"
      source  = "hashicorp/random"
    }
    archive = {
      version = "~> 2.2.0"
      source  = "hashicorp/archive"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

data "archive_file" "login" {
  type = "zip"

  source_file = "../login/loginHandler.js"
  output_path = "../loginHandler.zip"
}

module "auth_bucket" {
  source      = "./modules/auth-bucket"
  bucket_name = "lambda-auth"
}

resource "aws_s3_bucket_object" "login_handler" {
  bucket = module.auth_bucket.lambda_auth_bucket

  key    = "loginHandler.zip"
  source = data.archive_file.login.output_path

  etag       = filemd5(data.archive_file.login.output_path)
  depends_on = [module.auth_bucket]
}
