import mysql from "mysql";

const db = (() => {
  const client = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  });

  return {
    query: (sql, fields = []) => {
      if (!sql) {
        console.error("Please passed the sql statement");
        return;
      }

      return new Promise((resolve, reject) => {
        client.connect((err) => err && reject(err));

        client.query(sql, fields, (err, results, _fields) => {
          if (err) return reject(err);

          resolve(results);
        });

        client.end((err) => err && reject(err));
      });
    },
    transaction: () => {},
  };
})();

export { db };
