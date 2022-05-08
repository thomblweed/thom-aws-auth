#!/usr/bin/bash

aws dynamodb put-item --endpoint-url http://localhost:8000 \
    --table-name 'UsersAuth' \
    --item \
    '{"UserId": {"S": "No One You Know"}, "Email": {"S": "thomblweed@gmail.com"}}'
