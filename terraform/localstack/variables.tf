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
