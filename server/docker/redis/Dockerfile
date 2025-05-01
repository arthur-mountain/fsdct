FROM redis:alpine

VOLUME ./dockers/redis/data/node1:/data

CMD ["sh", "-c", "redis-server \
  --cluster-enabled yes \
  --cluster-node-timeout 5000 \
  --appendonly yes"]
