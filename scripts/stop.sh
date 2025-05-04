#!/usr/bin/env bash

set -a
source ./client/.env
source ./server/.env
set +a

docker-compose \
  -f docker-componse.network.yml \
  -f ./server/docker/docker-compose.yml \
  down "$@"
#-f ./client/docker/docker-compose.yml \
