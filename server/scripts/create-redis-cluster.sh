#!/usr/bin/env bash

set -a
source ./server/.env
set +a

# 定義 Redis container 名稱（或 hostname:port，如果 container 名就是 host）
connections=(
  "${REDIS_HOST1}:${REDIS_PORT1}"
  "${REDIS_HOST2}:${REDIS_PORT2}"
  "${REDIS_HOST3}:${REDIS_PORT3}"
  "${REDIS_HOST4}:${REDIS_PORT4}"
  "${REDIS_HOST5}:${REDIS_PORT5}"
  "${REDIS_HOST6}:${REDIS_PORT6}"
)

# 等待每個 Redis 節點準備就緒
for connection in "${connections[@]}"; do
  host="${connection%%:*}"
  port="${connection##*:}"

  echo "[fsdct]: Waiting for $host:$port to be ready..."
  until docker exec -i "$host" redis-cli -p "$port" -a "$REDIS_PASSWORD" ping | grep -q PONG; do
    sleep 3
  done
  echo "[fsdct]: $host:$port is ready."
done

# 用其中一個 container 來執行 cluster create（例如用第一個 host）
first_host="${connections[0]%%:*}"

echo "yes" | docker exec -i "$first_host" redis-cli \
  -a "$REDIS_PASSWORD" \
  --cluster-replicas 1 \
  --cluster create \
  "${connections[@]}"
