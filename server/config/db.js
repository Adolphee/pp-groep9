const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '172.20.0.200',
  user: '1819IP_groep09',
  database: '1819IP_groep09',
  password: 'dimadi'
});

db.connect((err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Connected to database');
  
})

module.exports = db;