import pgPromise from "pg-promise";
import path from "node:path";
import { fileURLToPath } from "node:url";

let db;

const getDB = () => {
  if (db) return db;

  const initOpts = {
    query(e) {
      console.log("SQL:", e.query);
      if (e.params) {
        console.log("PARAMS:", e.params);
      }
    },
    error(err, e) {
      console.error("PG ERROR:", err.message || err);
    },
  };
  const pgp = pgPromise(initOpts);
  const client = pgp(
    "postgres://" +
      process.env.POSTGRES_TEST_USERNAME1 +
      ":" +
      process.env.POSTGRES_TEST_PASSWORD1 +
      "@" +
      process.env.POSTGRES_HOST +
      ":" +
      process.env.PGPORT +
      "/" +
      process.env.POSTGRES_DB,
  );

  return (db = {
    // --- SQL File loader (從 ./sqls/xxx) ---
    sqlLoader: (filepath) => {
      const filename = fileURLToPath(import.meta.url);
      const dirname = path.dirname(filename);
      return new pgPromise.QueryFile(path.join(dirname, "sqls", filepath), {
        minify: true,
      });
    },

    query: (sql, values = []) => {
      if (!sql) {
        console.error("Please pass the SQL statement");
        return;
      }

      return client.any(sql, values);
    },

    queryWithRetry: async (sql, params = [], retries = 3, delay = 500) => {
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          return await client.any(sql, params);
        } catch (err) {
          console.warn(
            `Query failed (attempt ${attempt}/${retries}): SQL: ${sql}, Error: ${err.message}`,
          );
          if (attempt === retries) throw err;
          await new Promise((res) => setTimeout(res, delay));
        }
      }
    },

    // --- ORM ---
    insert: (table, data) => {
      const query = pgp.helpers.insert(data, Object.keys(data), table);
      return client.none(query); // No retry needed here
    },

    update: (table, data, condition) => {
      if (!condition || !condition.sql || !Array.isArray(condition.values)) {
        throw new Error("Invalid condition format: use { sql, values }");
      }

      const cs = new pgp.helpers.ColumnSet(Object.keys(data), { table });
      const query =
        pgp.helpers.update(data, cs) +
        pgp.as.format(` WHERE ${condition.sql}`, condition.values);

      return client.none(query);
    },

    delete: (table, condition) => {
      if (!condition || !condition.sql || !Array.isArray(condition.values)) {
        throw new Error("Invalid condition format: use { sql, values }");
      }

      const query = pgp.as.format(
        `DELETE FROM ${table} WHERE ${condition.sql}`,
        condition.values,
      );

      return client.none(query);
    },

    // --- transaction ---
    transaction: async (callback) => {
      try {
        return await client.tx(callback);
      } catch (err) {
        console.error("TRANSACTION ERROR:", err);
        throw err;
      }
    },
  });
};

export { getDB };
