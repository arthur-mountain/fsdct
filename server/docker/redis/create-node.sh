#!/usr/bin/env sh

redis-server \
  --requirepass "$REDIS_PASSWORD" \
  --masterauth "$REDIS_PASSWORD" \
  --port "$REDIS_PORT" \
  --cluster-enabled yes \
  --cluster-announce-ip "$REDIS_HOST" \
  --cluster-node-timeout 5000 \
  --appendonly yes
