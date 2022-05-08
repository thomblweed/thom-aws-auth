terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "2.16.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "dynamodb_auth" {
  name         = "amazon/dynamodb-local:1.17.2"
  keep_locally = true
}

resource "docker_container" "dynamodb_auth" {
  image          = docker_image.dynamodb_auth.name
  name           = "dynamodb_auth"
  working_dir    = "/home/dynamodblocal"
  remove_volumes = true
  volumes {
    host_path      = "${path.cwd}/data/dynamodb-auth"
    container_path = "/home/dynamodblocal/data"
  }
  ports {
    internal = 8000
    external = 8000
  }
  command = ["-jar", "DynamoDBLocal.jar", "-sharedDb", "-dbPath", "./data"]
  user    = "root"
}
