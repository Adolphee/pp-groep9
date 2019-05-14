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

router.post('/insert/newAdres', (req, res) => {
  let { voornaam, achternaam, geboortedatum, land, gemeente, postcode, straat, huisnummer, busnummer} = req.body;
  let checkAdres = 'SELECT * FROM adressen WHERE land LIKE ? AND gemeente LIKE ? AND postcode LIKE ? AND straatnaam LIKE ? AND huisnummer LIKE ?;';
  let adresBestaat = true;
  let tempAdres;
  let adresId;
  db.query(checkAdres, [land, gemeente, postcode, straat, huisnummer, busnummer], (err, result) => {
    if (err) {
      return console.log(err);
    }
    if (result[0]) {
      tempAdres = result[0];
      adresBestaat = true;
    }
    if (!result[0]) {
      adresBestaat = false;
    }

    if (adresBestaat) {
      // console.log(tempAdres);
      adresId = tempAdres.adres_id;
      res.send({
        "msg": "adres bestaat al"
      })
    } else {
      let maakAdres = "INSERT INTO adressen(land,gemeente,postcode,straatnaam,huisnummer,busnummer) VALUES(?,?,?,?,?,?);";
      db.query(maakAdres, [land, gemeente, postcode, straat, huisnummer, busnummer],(err, result, fields) => {
        if (err) {
          return console.log(err);
        }
        res.send({
          "msg": "adres is aangemaakt"
        });
        adresId = result.insertId;
      })
    }

    

  });
});

module.exports = router;