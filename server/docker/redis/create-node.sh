#!/usr/bin/env sh

# 啟動 redis server 的時候，
# 要帶入 cluster 相關得參數，透過 cli args or redis-conf 都可以，
# 這邊 demo 是直接透過 cli args
redis-server \
  --requirepass "$REDIS_PASSWORD" \
  --masterauth "$REDIS_PASSWORD" \
  --port "$REDIS_PORT" \
  --cluster-enabled yes \
  --cluster-announce-ip "$REDIS_HOST" \
  --cluster-node-timeout 5000 \
  --appendonly yes
