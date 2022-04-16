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

  source_file = "../login/login.js"
  output_path = "../login/login.zip"
}

module "auth_bucket" {
  source      = "./modules/auth-bucket"
  bucket_name = "lambda-auth"
}

resource "aws_s3_bucket_object" "login_handler" {
  bucket = module.auth_bucket.lambda_auth_bucket

  key    = "login.zip"
  source = data.archive_file.login.output_path

  etag       = filemd5(data.archive_file.login.output_path)
  depends_on = [module.auth_bucket]
}

resource "aws_lambda_function" "login" {
  function_name = "login"

  s3_bucket = module.auth_bucket.lambda_auth_bucket
  s3_key    = aws_s3_bucket_object.login_handler.key

  runtime = "nodejs14.x"
  handler = "login.handler"

  source_code_hash = data.archive_file.login.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "login" {
  name = "/aws/lambda/${aws_lambda_function.login.function_name}"

  retention_in_days = 14
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
