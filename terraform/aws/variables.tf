variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
  default     = "eu-west-2"
}

variable "node_runtime" {
  description = "Node.js runtime version."
  type        = string
  default     = "nodejs14.x"
}

variable "auth_bucket_name" {
  description = "Name of the S3 bucket to store the login handler."
  type        = string
  default     = "lambda-auth"
}

variable "thom_username" {
  description = "Username for the thom user."
  type        = string
  sensitive   = true
}

variable "thom_email" {
  description = "Email address for the thom user."
  type        = string
  sensitive   = true
}

variable "thom_password" {
  description = "Password for the thom user."
  type        = string
  sensitive   = true
}

variable "user_pool_id" {
  description = "User pool ID"
  type        = string
  sensitive   = true
}

variable "client_id" {
  description = "User pool client ID"
  type        = string
  sensitive   = true
}
