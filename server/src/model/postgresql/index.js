import pgp from "pg-promise";

const db = (() => {
  const client = pgp()(
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

    transaction: async (callback) => {
      try {
        return await client.tx(async (t) => {
          return await callback(t);
        });
      } catch (err) {
        throw err;
      }
    },
  };
})();

export { db };
