import pgp from "pg-promise";

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
  const client = pgp(initOpts)(
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
            `Query failed (attempt ${attempt}/${retries}):`,
            err.message,
          );
          if (attempt === retries) throw err;
          await new Promise((res) => setTimeout(res, delay));
        }
      }
    },

    transaction: async (callback) => {
      try {
        return await client.tx(async (t) => {
          return await callback(t); // t 提供給 callback 使用 query
        });
      } catch (err) {
        console.error("TRANSACTION ERROR:", err);
        throw err;
      }
    },
  };
})();

export { db };
