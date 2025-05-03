#!/usr/bin/env sh

# connections（用空格分隔所有 host:port）
connections="
  $REDIS_HOST1:$REDIS_PORT1
  $REDIS_HOST2:$REDIS_PORT2
  $REDIS_HOST3:$REDIS_PORT3
  $REDIS_HOST4:$REDIS_PORT4
  $REDIS_HOST5:$REDIS_PORT5
  $REDIS_HOST6:$REDIS_PORT6
"

# 等待每個 Redis 節點
for connection in $connections; do
  host=$(echo "$connection" | cut -d: -f1)
  port=$(echo "$connection" | cut -d: -f2)
  echo "[fsdct]: Waiting for $host:$port to be ready..."
  until redis-cli -h "$host" -p "$port" -a "$REDIS_PASSWORD" ping | grep -q PONG >/dev/null; do
    sleep 1
  done
  echo "[fsdct]: $host:$port is ready."
done

echo "yes" | redis-cli \
  -a "$REDIS_PASSWORD" \
  --cluster-replicas 1 \
  --cluster create \
  $connections
