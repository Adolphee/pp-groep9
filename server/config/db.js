const mysql = require('mysql2');

const db = mysql.createPool({
  host: '172.20.0.200',
  user: '1819IP_groep09',
  database: '1819IP_groep09',
  password: 'dimadi',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;