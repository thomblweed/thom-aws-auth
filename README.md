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

`npm install`
`npm run setup`

### Run with Docker

I'm using https://localstack.cloud/ for running my lambdas locally and for testing. However, I do not have the pro license required to locally run the AWS services Cognito, Lambda Layers and Gateway V2.

I have come up with a bit of a hack to merge the Layers and Lambas in a single package to deploy to the localstack container. It's not a nice approach but it does save me having to spend money.
The other tade off, of course, is I don't get to run "integration" tests with the Gateway service.

To run with docker, I am using Terraform for spinning up the docker container as well as the localstack setup for the AWS services.
`npm run up` - spins up the localstack container with the service for S3 and Lambda
`npm run create:local-lambdas` - this is the hack to merge the layers and lambdas into one package
`npm run apply:local` - apply/deploy S3 and Lambas to the localstack container

### Tear down

`npm run destroy:local` - destroy the localstack services from the localsatck container
`npm run down` - tear down the localstack docker container
