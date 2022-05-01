output "lambda_auth_bucket" {
  description = "S3 bucket used to store lambda function code for auth."
  value       = aws_s3_bucket.lambda_auth_bucket.id
}
