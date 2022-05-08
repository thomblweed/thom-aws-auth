terraform {
  required_version = ">= 1.1.7"
}

resource "random_id" "bucket_id" {
  byte_length = 8
}

resource "aws_s3_bucket" "lambda_auth_bucket" {
  bucket = "${var.bucket_name}-${random_id.bucket_id.hex}"

  acl           = "private"
  force_destroy = true
}
