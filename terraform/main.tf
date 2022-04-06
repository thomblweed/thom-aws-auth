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

resource "random_pet" "lambda_bucket_name" {
  prefix = "thom-auth-functions"
  length = 4
}

resource "aws_s3_bucket" "lambda_auth_login_bucket" {
  bucket = random_pet.lambda_bucket_name.id

  acl           = "private"
  force_destroy = true
}

data "archive_file" "login" {
  type = "zip"

  source_file = "../login/loginHandler.js"
  output_path = "../loginHandler.zip"
}

resource "aws_s3_bucket_object" "login_handler" {
  bucket = aws_s3_bucket.lambda_auth_login_bucket.id

  key    = "loginHandler.zip"
  source = data.archive_file.login.output_path

  etag = filemd5(data.archive_file.login.output_path)
}
