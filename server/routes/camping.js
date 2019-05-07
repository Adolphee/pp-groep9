const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/alleTenten', (req, res) => {
  const alleTenten = "select * from producten where productnaam like '%tent%';";
  db.query(alleTenten, (err, results, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(results);
  });
});

router.get('/search/:term', (req, res) => {
  const term = req.params.term;
  const zoekQuery = `select * from producten where productnaam like '%${term}%';`;
  db.query(zoekQuery, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(results);
  });
});

module.exports = router;