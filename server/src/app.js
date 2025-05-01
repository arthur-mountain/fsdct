import express from "express";
import cors from "cors";
// import mysql from './model/mysql/index.js';
import { getRedis } from "./model/redis/index.js";

const app = express();
const port = process.env.BACKEND_PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.json({ message: "hello" });
});

app.get("/test", async (req, res) => {
  const key = "cache:query";

  if (await (await getRedis()).get(key)) {
    return res.json({
      message: "get cached query from redis",
      data: await (await getRedis()).get(key),
    });
  }

  const data = JSON.stringify(req.query);
  await (await getRedis()).set(key, data);
  return res.json({ message: "get value from query", data });
});

app.listen(port, () => console.log(`🚀 ~ start listening to ${port}`));
