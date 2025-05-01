// libs/redis.js
import { createClient } from "redis";

let redis = null;

const getRedis = async () => {
  if (redis) return redis;

  const client = createClient();

  client.on("error", (err) => {
    console.error("❌ Redis error:", err);
  });

  await client.connect();
  console.log("✅ Redis connected");

  return (redis = {
    /**
     * 設定純文字（可選 TTL）
     */
    set: async (key, value, ttlInSeconds) => {
      if (ttlInSeconds) {
        return client.set(key, value, { EX: ttlInSeconds });
      }
      return client.set(key, value);
    },

    /**
     * 取得純文字
     */
    get: async (key) => {
      return client.get(key);
    },

    /**
     * 刪除
     */
    del: async (key) => {
      return client.del(key);
    },

    /**
     * 檢查 key 是否存在
     */
    exists: async (key) => {
      const result = await client.exists(key);
      return result === 1;
    },

    /**
     * 設定物件，會自動做 JSON.stringify（可選 TTL）
     */
    setJson: async (key, obj, ttlInSeconds) => {
      const value = JSON.stringify(obj);
      if (ttlInSeconds) {
        return client.set(key, value, { EX: ttlInSeconds });
      }
      return client.set(key, value);
    },

    /**
     * 取得物件，自動 JSON.parse
     */
    getJson: async (key) => {
      const value = await client.get(key);
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    },

    /**
     * 原始 client，如果要用 scan、hset、pipeline 等
     */
    raw: client,
  });
};

export { getRedis };
