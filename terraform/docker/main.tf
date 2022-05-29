terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "2.16.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "localstack" {
  name         = "localstack/localstack:0.14.2"
  keep_locally = true
}

resource "docker_container" "localstack" {
  image = docker_image.localstack.name
  name  = "localstack"
  env   = ["SERVICES=lambda,s3,apigatewayv2", "DOCKER_HOST=unix:///var/run/docker.sock", "DEFAULT_REGION=eu-west-2", "DATA_DIR=/tmp/localstack/data"]

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
