import mysql from 'mysql';

export default (() => {
  const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  });

  return {
    query: (sql, fields = []) => {
      if (!sql) {
        console.error('Please passed the sql statement');
        return
      };

      return new Promise((resolve, reject) => {
        db.connect((err) => err && reject(err));

        db.query(sql, fields, (err, results, _fields) => {
          if (err) return reject(err);

          resolve(results);
        });

        db.end((err) => err && reject(err));
      })
    },
    transaction: () => { }
  }
})()