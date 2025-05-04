import express from "express";
import cors from "cors";
import { getDB } from "./model/postgresql/index.js";
import { getRedis } from "./model/redis/index.js";

const app = express();
const port = process.env.BACKEND_PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.json({ message: "hello" });
});

app.get("/test-db", async (_, res) => {
  return res.json({
    message: "get value from db",
    data: await getDB().query("select * from fsdct"),
  });
});

app.post("/test-db/create", async (req, res) => {
  await getDB().insert("fsdct", req.body);
  return res.json({
    message: "insert value successfully",
    data: req.body,
  });
});

app.delete("/test-db/delete", async (req, res) => {
  if (req.body.name) {
    await getDB().delete("fsdct", {
      sql: "name = $1",
      values: [req.body.name],
    });
    return res.json({
      message: "delete successfully by name",
      data: req.body.name,
    });
  } else if (req.body.email) {
    await getDB().delete("fsdct", {
      sql: "email = $1",
      values: [req.body.email],
    });
    return res.json({
      message: "delete successfully by email",
      data: req.body.email,
    });
  } else {
    return res.status(404).json({ message: "Not found" });
  }
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

app.get("/test/clean", async (_, res) => {
  const key = "cache:query";
  await (await getRedis()).del(key);
  return res.json({ message: "remove cached query from redis" });
});

app.listen(port, () => console.log(`🚀 ~ start listening to ${port}`));
