terraform {
  required_version = "~> 1.1.17"

  required_providers {
    aws = {
      version = "~> 2.4.6"
      source  = "hashicorp/aws"
    }
    random = {
      version = "~> 3.1.0"
      source  = "hashicorp/random"
    }
    archive = {
      version = "~> 2.2.0"
      source  = "hashicorp/terraform-provider-archive"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "auth_lambda_bucket" {
  bucket = var.bucket_name
  acl    = "private"
}
