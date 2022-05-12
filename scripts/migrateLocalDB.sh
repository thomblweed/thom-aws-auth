#!/usr/bin/bash

aws dynamodb create-table --endpoint-url http://localhost:8000 \
    --table-name 'UsersAuth' \
    --attribute-definitions AttributeName=UserId,AttributeType=S AttributeName=Email,AttributeType=S \
    --key-schema AttributeName=UserId,KeyType=HASH AttributeName=Email,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

aws dynamodb put-item --endpoint-url http://localhost:8000 \
    --table-name 'UsersAuth' \
    --item \
    '{"UserId": {"S": "No One You Know"}, "Email": {"S": "thomblweed@gmail.com"}}'
