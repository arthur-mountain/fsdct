import pgPromise, { QueryFile } from "pg-promise";
import path from "node:path";
import { fileURLToPath } from "node:url";

const db = (() => {
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
      process.env.POSTGRES_CONTAINER_PORT +
      "/" +
      process.env.POSTGRES_DB,
  );

  return {
    // --- SQL File loader (從 ./sqls/xxx) ---
    sqlLoader: (filepath) => {
      const filename = fileURLToPath(import.meta.url);
      const dirname = path.dirname(filename);
      return new QueryFile(path.join(dirname, "sqls", filepath), {
        minify: true,
      });
    },

    query: (sql, params = []) => {
      if (!sql) {
        console.error("Please pass the SQL statement");
        return;
      }

      return client.any(sql, params);
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
      const cs = new pgp.helpers.ColumnSet(Object.keys(data), { table });
      const query =
        pgp.helpers.update(data, cs) +
        pgp.as.format(
          " WHERE " +
            Object.keys(condition)
              .map((key, i) => `${key} = $${i + 1}`)
              .join(" AND "),
          Object.values(condition),
        );
      return client.none(query); // No retry needed here
    },

    delete: (table, condition) => {
      const where = Object.keys(condition)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(" AND ");
      const query = `DELETE FROM ${table} WHERE ${where}`;
      return client.none(query, Object.values(condition)); // No retry needed here
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
  };
})();

export { db };
