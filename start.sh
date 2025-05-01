#!/usr/local/bin bash

set -a
source ./client/.env
source ./server/.env
set +a

docker-componse \
  -f docker-componse.network.yml \
  -f ./server/docker/docker-compose.yml \
  -f ./client/docker/docker-compose.yml \
  up "$@"
