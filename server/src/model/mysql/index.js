import mysql from 'mysql'

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
});

export default {
  query: () => {
    return new Promise((resolve, reject) => {
      db.connect((err) => err && reject(err))

      // ... do something database action
    })
  },
  transaction: () => { }
}