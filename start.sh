#!/usr/local/bin bash

docker-componse \
  -f docker-componse.network.yml \
  -f ./server/docker/docker-compose.yml \
  -f ./client/docker/docker-compose.yml \
  up
