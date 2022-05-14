terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "thomblweed"
    workspaces {
      name = "thom-s3-backend"
    }
  }
}
