### ✅ `sqlLoader(filepath)`

**用途**：載入 `.sql` 檔案中的查詢語句
**範例**（假設你有個 SQL 檔叫 `get-users.sql`）：

```javascript
const sql = db.sqlLoader("get-users.sql");
db.query(sql).then(console.log);
```

---

### ✅ `query(sql, params)`

**用途**：執行任意查詢
**範例**：

```javascript
const users = await db.query("SELECT * FROM users WHERE age > $1", [18]);
console.log(users);
```

---

### ✅ `queryWithRetry(sql, params, retries, delay)`

**用途**：具有重試機制的查詢（通常用在會有間歇性失敗的情況）
**範例**：

```javascript
const result = await db.queryWithRetry("SELECT * FROM users WHERE email=$1", [
  "test@example.com",
]);
console.log(result);
```

---

### ✅ `insert(table, data)`

**用途**：插入單筆資料
**範例**：

```javascript
await db.insert("users", {
  name: "Alice",
  age: 25,
  email: "alice@example.com",
});
```

---

### ✅ `update(table, data, condition)`

**用途**：根據條件更新資料
**範例**：

```javascript
await db.update(
  "users",
  { age: 30 },
  { sql: "email = $1", values: ["alice@example.com"] },
);
```

---

### ✅ `delete(table, condition)`

**用途**：根據條件刪除資料
**範例**：

```javascript
await db.delete("users", {
  sql: "age < $1",
  values: [18],
});
```

---

### ✅ `transaction(callback)`

**用途**：執行多筆操作的交易，確保資料一致性
**範例**：

```javascript
await db.transaction(async (t) => {
  await t.none("UPDATE users SET age = age + 1");
  await t.none("DELETE FROM users WHERE age > $1", [100]);
});
```
