terraform {
  required_version = "1.2.1"

  backend "s3" {
    bucket               = "thom-terraform-backend"
    key                  = "terraform.tfstate"
    region               = "eu-west-2"
    workspace_key_prefix = "thom-auth"
    dynamodb_table       = "thom-terraform-state"
    encrypt              = true
  }

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
