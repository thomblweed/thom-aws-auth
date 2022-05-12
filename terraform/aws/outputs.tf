output "function_name" {
  description = "Name of the login Lambda function."

  value = aws_lambda_function.login.function_name
}

output "base_url" {
  description = "Base URL for API Gateway stage."

  value = aws_apigatewayv2_stage.auth_stage.invoke_url
}
