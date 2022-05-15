output "s3_bucket_id" {
  description = "S3 bucket basic config"
  value       = aws_s3_bucket.s3_bucket.id
}
