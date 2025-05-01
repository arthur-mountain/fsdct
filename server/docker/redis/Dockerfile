FROM redis:alpine

COPY redis.conf /usr/local/etc/redis/redis.conf

VOLUME ./dockers/redis/data/node1:/data

CMD ["sh", "-c", "redis-server /usr/local/etc/redis/redis.conf \
  --cluster-enabled yes \
  --cluster-config-file nodes.conf \
  --cluster-node-timeout 5000 \
  --appendonly yes"]
