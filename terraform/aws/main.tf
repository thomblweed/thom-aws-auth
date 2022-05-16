module "auth_bucket" {
  source      = "./modules/bucket"
  bucket_name = var.auth_bucket_name
}

module "login_archive" {
  source      = "./modules/archive-file"
  source_file = "../../src/login.js"
  output_path = "../../src/login.zip"
}

resource "aws_s3_bucket_object" "login_handler" {
  bucket = module.auth_bucket.s3_bucket_id

  key    = "login.zip"
  source = module.login_archive.output_path

  etag       = filemd5(module.login_archive.output_path)
  depends_on = [module.auth_bucket]
}

# lambda functions
resource "aws_lambda_function" "login" {
  function_name = "login"

  s3_bucket = module.auth_bucket.s3_bucket_id
  s3_key    = aws_s3_bucket_object.login_handler.key

  runtime = var.node_runtime
  handler = "login.handler"

  source_code_hash = module.login_archive.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "login" {
  name = "/aws/lambda/${aws_lambda_function.login.function_name}"

  retention_in_days = 14
}

# IAM
resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# api gateway
resource "aws_apigatewayv2_api" "auth_api" {
  name          = "serverless_auth"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "auth_stage" {
  api_id = aws_apigatewayv2_api.auth_api.id

  name        = "auth"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_apigatewayv2_integration" "auth_integration" {
  api_id = aws_apigatewayv2_api.auth_api.id

  integration_uri        = aws_lambda_function.login.invoke_arn
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "gateway_login_route" {
  api_id = aws_apigatewayv2_api.auth_api.id

  route_key = "POST /login"
  target    = "integrations/${aws_apigatewayv2_integration.auth_integration.id}"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.auth_api.name}"

  retention_in_days = 30
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.login.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.auth_api.execution_arn}/*/*"
}
