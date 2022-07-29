# thom-aws-auth

## Description

Lambdas for user authentication with AWS Cognito. Currently learning AWS Lambdas alongside Terraform so using this as a platform for that. This will be used with my web app in the future.

## Development

### Prerequisites

Installations and setup of the following:

- AWS CLI
- Terraform
- Docker

### Setup

```
npm run setup
npm run build
```

### Run with Docker

I'm using https://localstack.cloud/ for running my lambdas locally and for testing. However, I do not have the pro license required to locally run the AWS services Cognito, Lambda Layers and Gateway V2.
I currently have a separate terraform setup for localstack from the aws setup. This is not ideal and so will find a way to change this later.

With the lambda layers needing the pro localstack license, I have come up with a bit of a hack to merge the Layers and Lambas in a single package to deploy to the localstack container. It's not a nice approach but it works for now.
A trade off, of course, is I don't get to run integration tests with the Gateway service.

To run with docker, I am using Terraform for spinning up the docker container as well as the localstack setup for the AWS services.

- `npm run up` - spins up the localstack container with the services for S3 and Lambda
- `npm run create:local-lambdas` - this is the hack to merge the layers and lambdas into one package (sick face)
- `npm run apply:local` - apply/deploy S3 and Lambas to the localstack container

### Tear down

- `npm run destroy:local` - destroy the localstack services from the localstack container
- `npm run down` - tear down the localstack docker container

## Deployment

To deploy the AWS services I am using Terraform as per the tf files at location `terraform/aws`. This process will be moved to a pipeline eventually.

I have added a user to the Cognito user pool and so setting up a secrets tfvars file for the values alongside values for the Cognito env vars.

Change to the terraform directory for aws.

```
cd terraform/aws
```

#### Initialise Terraform and create secrets file

```
terraform init
touch secrets.tfvars
```

#### Add the following to secrets.tfvars file with applicable values:

```
thom_username = "<username value goes here>"
thom_email = "<email value goes here>"
thom_password = "<password value goes here>"
user_pool_id = "<user pool id goes here>"
client_id = "<client id goes here>"
```

#### Validate Terraform

```
terraform validate
```

If all is good, plan the changes

```
terraform plan -out=out.tfplan -var-file=secrets.tfvars
```

#### Deploy to AWS

```
terraform apply "out.tfplan"
```
