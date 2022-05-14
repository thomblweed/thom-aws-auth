resource "aws_dynamodb_table" "auth_table" {
  name           = "auth"
  read_capacity  = "5"
  write_capacity = "5"
  hash_key       = "UserId"
  range_key      = "Email"

  attribute {
    name = "UserId"
    type = "S"
  }
  attribute {
    name = "Email"
    type = "S"
  }
}
