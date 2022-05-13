#!/usr/bin/bash

if [ -d terraform/aws/.terraform ]; then
    rm -rf terraform/aws/.terraform
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
find terraform* -name '.terraform*' -type f -delete
find lambdas -name '*.js' -type f -delete
find lambdas -name '*.zip' -type f -delete
