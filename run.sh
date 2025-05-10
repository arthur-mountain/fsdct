#!/usr/bin/env bash

set -a
source ./client/.env
source ./server/.env
set +a

docker-compose \
  -f docker-compose.network.yml \
  -f ./server/docker/docker-compose.yml \
  -f ./server/docker/postgresql/docker-compose.yml \
  -f ./server/docker/redis/docker-compose.yml \
  "$@"
# -f ./client/docker/docker-compose.yml \
