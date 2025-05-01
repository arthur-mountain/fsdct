// libs/redis.js
import { createClient, createCluster } from "redis";

let redis = null;

const getInstance = async (type) => {
  switch (type) {
    case "cluster": {
      const cluster = createCluster({
        rootNodes: [
          {
            url: `redis://${process.env.REDIS_HOST1}:${process.env.REDIS_CONTAINER_PORT}`,
          },
          // 若有其他節點可以一併加入
        ],
      });

      cluster.on("error", (err) => {
        console.error("❌ Redis Cluster error:", err);
      });

      await cluster.connect();
      console.log("✅ Redis Cluster connected");
      return cluster;
    }
    case "node":
    default: {
      const client = createClient({
        url: `redis://${process.env.REDIS_HOST1}:${process.env.REDIS_CONTAINER_PORT}`,
      });

      client.on("error", (err) => {
        console.error("❌ Redis error:", err);
      });

      await client.connect();
      console.log("✅ Redis connected");
      return client;
    }
  }
};

const getRedis = async () => {
  if (redis) return redis;

  const instance = await getInstance();

  return (redis = {
    /**
     * 設定純文字（可選 TTL）
     */
    set: async (key, value, ttlInSeconds) => {
      if (ttlInSeconds) {
        return instance.set(key, value, { EX: ttlInSeconds });
      }
      return instance.set(key, value);
    },

    /**
     * 取得純文字
     */
    get: async (key) => {
      return instance.get(key);
    },

    /**
     * 刪除
     */
    del: async (key) => {
      return instance.del(key);
    },

    /**
     * 檢查 key 是否存在
     */
    exists: async (key) => {
      const result = await instance.exists(key);
      return result === 1;
    },

    /**
     * 設定物件，會自動做 JSON.stringify（可選 TTL）
     */
    setJson: async (key, obj, ttlInSeconds) => {
      const value = JSON.stringify(obj);
      if (ttlInSeconds) {
        return instance.set(key, value, { EX: ttlInSeconds });
      }
      return instance.set(key, value);
    },

    /**
     * 取得物件，自動 JSON.parse
     */
    getJson: async (key) => {
      const value = await instance.get(key);
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    },

    /**
     * 原始 instance	，如果要用 scan、hset、pipeline 等
     */
    raw: instance,
  });
};

export { getRedis };
