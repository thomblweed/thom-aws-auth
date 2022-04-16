output "function_name" {
  description = "Name of the login Lambda function."

  value = aws_lambda_function.login.function_name
}
