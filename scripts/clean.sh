#!/usr/bin/bash

if [ -d terraform/.terraform ]; then
    rm -rf terraform/.terraform
fi

find terraform -name '*.tfstate*' -type f -delete
find terraform -name '.terraform*' -type f -delete
find login -name '*.js' -type f -delete
find login -name '*.zip' -type f -delete
