#!/usr/bin/env sh

redis-server \
  --requirepass "$REDIS_PASSWORD" \
  --masterauth "$REDIS_PASSWORD" \
  --port "$REDIS_PORT" \
  --cluster-enabled yes \
  --cluster-node-timeout 5000 \
  --appendonly yes
