const express = require('express');
const router = express.Router();
const axios = require('axios');
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

router.get('/kookGerei', (req, res) => {
  const kookGerei = "select * from producten where productnaam like '%slaap%' or productnaam like '%matras%';";
  db.query(kookGerei, (err, results) => {
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
  let {land, gemeente, postcode, straat, huisnummer, busnummer} = req.body;
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
        msg: "adres bestaat al",
        adresId: adresId
      })
    } else {
      let maakAdres = "INSERT INTO adressen(land,gemeente,postcode,straatnaam,huisnummer,busnummer) VALUES(?,?,?,?,?,?);";
      db.query(maakAdres, [land, gemeente, postcode, straat, huisnummer, busnummer],(err, result, fields) => {
        if (err) {
          return console.log(err);
        }
        adresId = result.insertId;
        res.send({
          msg: "adres is aangemaakt",
          adresId: adresId
        });
      })
    }
  });
});

router.post('/insert/newKlant', (req, res) => {
  let { voornaam, achternaam, geboortedatum, land, gemeente, postcode, straat, huisnummer, busnummer} = req.body;
  // adres al dan niet inserten en adres id terug sturen
  axios({
    method: 'post',
    url: 'http://10.3.50.56:3009/api/insert/newAdres',
    data: {
      land: land,
      gemeente: gemeente,
      postcode: postcode,
      straat: straat,
      huisnummer: huisnummer,
      busnummer: busnummer
    }
  }).then((resp) => {
    // het adres id dat zonet is aangemaakt of is opgehaald in de database in een variabale steken
    let adresId = resp.data.adresId;
    let klantId;
    // kijken of de user al dan niet bestaat
    let checkUser = 'SELECT * FROM klanten WHERE voornaam LIKE ? AND achternaam LIKE ? AND geboortedatum LIKE ?;';
    let klantBestaat = true;
    let tempKlant;
    db.query(checkUser, [voornaam, achternaam, geboortedatum], (err, result) => {
      if (err) {
        return console.log(err);
      }
      if (result[0]) {
        tempKlant = result[0];
        klantBestaat = true;
      }
      if (!result[0]) {
        klantBestaat = false;
      }

      if (klantBestaat) {
        klantId = tempKlant.klant_id;
        console.log(klantId);
        res.send({
          msg: "klant bestaat al",
          klantId: klantId
        })
      } else {
        let maakKlant = "INSERT INTO klanten(voornaam, achternaam, geboortedatum, klant_adres_id) VALUES(?,?,?,?);";
        db.query(maakKlant, [voornaam, achternaam, geboortedatum, adresId], (err, result) => {
          if (err) {
            return console.log(err);
          }
          klantId = result.insertId;
          res.send({
            msg: "klant is aangemaakt",
            klantId: klantId
          })
        });
      }
    })
  }).catch((err)=> {
    console.log(err);
  });
});

module.exports = router;