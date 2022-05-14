variable "bucket_name" {
  type        = string
  description = "bucket name for the backend"
}

variable "sse_algorithm" {
  description = "Algorithm to use for server side encryption"
  type        = string
  default     = "AES256"
}

variable "dynamodb_table_name" {
  description = "Name of the DynamoDB table to store the locks"
  type        = string
}

variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
  default     = "eu-west-2"
}
