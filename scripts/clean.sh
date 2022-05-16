#!/usr/bin/bash

if [ -d coverage ]; then
    rm -rf coverage
fi

if [ -d terraform/aws/.terraform ]; then
    rm -rf terraform/aws/.terraform
fi

if [ -d terraform/backend/.terraform ]; then
    rm -rf terraform/backend/.terraform
fi

if [ -d terraform/docker/.terraform ]; then
    rm -rf terraform/docker/.terraform
fi

if [ -d terraform/localstack/.terraform ]; then
    rm -rf terraform/localstack/.terraform
fi

if [ -d terraform/docker/data ]; then
    sudo rm -rf terraform/docker/data
fi

find terraform* -name '*.tfstate*' -type f -delete
find terraform* -name '*.tfplan' -type f -delete
find src -name '*.js' -type f -delete
find src -name '*.zip' -type f -delete
