terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "2.16.0"
    }
  }
}

provider "docker" {}

# resource "docker_image" "dynamodb_auth" {
#   name         = "amazon/dynamodb-local:1.17.2"
#   keep_locally = true
# }

# resource "docker_container" "dynamodb_auth" {
#   image          = docker_image.dynamodb_auth.name
#   name           = "dynamodb_auth"
#   working_dir    = "/home/dynamodblocal"
#   remove_volumes = true
#   volumes {
#     host_path      = "${path.cwd}/data/dynamodb-auth"
#     container_path = "/home/dynamodblocal/data"
#   }
#   ports {
#     internal = 8000
#     external = 8000
#   }
#   command = ["-jar", "DynamoDBLocal.jar", "-sharedDb", "-dbPath", "./data"]
#   user    = "root"
# }

resource "docker_image" "localstack" {
  name         = "localstack/localstack:0.14.2"
  keep_locally = true
}

resource "docker_container" "localstack" {
  image = docker_image.localstack.name
  name  = "localstack"
  env   = ["SERVICES=dynamodb,lambda,s3,apigatewayv2", "DOCKER_HOST=unix:///var/run/docker.sock", "DEFAULT_REGION=eu-west-2", "DATA_DIR=/tmp/localstack/data"]

  ports {
    internal = 4566
    external = 4566
  }

  volumes {
    host_path      = "${path.cwd}/data/localstack"
    container_path = "/tmp/localstack/data"
  }
  volumes {
    host_path      = "/var/run/docker.sock"
    container_path = "/var/run/docker.sock"
  }
}
