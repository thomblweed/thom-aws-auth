module "auth_bucket" {
  source      = "../aws/modules/bucket"
  bucket_name = var.auth_bucket_name
}

module "login_archive" {
  source           = "../aws/modules/archive-file"
  source_file      = "../../temp/dist/login.js"
  output_path      = "../../temp/dist/login.zip"
  source_directory = null
}

resource "aws_s3_bucket_object" "login_handler" {
  bucket = module.auth_bucket.s3_bucket_id

  key    = "login.zip"
  source = module.login_archive.output_path

  etag       = filemd5(module.login_archive.output_path)
  depends_on = [module.auth_bucket]
}

resource "aws_lambda_function" "login" {
  function_name = "login"

  s3_bucket = module.auth_bucket.s3_bucket_id
  s3_key    = aws_s3_bucket_object.login_handler.key

  runtime = var.node_runtime
  handler = "login.handler"

  source_code_hash = module.login_archive.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        },
        "Effect": "Allow",
        "Sid": ""
      }
    ]
  }
  EOF
}
