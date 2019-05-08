const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/tenten', (req, res) => {
  const tenten = "select * from producten where productnaam like '%tent%';";
  db.query(tenten, (err, results, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(results);
  });
});

router.get('/slaapGerief', (req, res) => {
  const slaapGerief = "select * from producten where productnaam like '%slaap%' or productnaam like '%matras%';";
  db.query(slaapGerief, (err, results) => {
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