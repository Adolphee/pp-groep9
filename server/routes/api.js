const express = require('express');
const router = express.Router();
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const db = require('../config/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

router.route('/bestellingen').post(function (req, res) {
    let uitleendatum = req.body.uitleendatum,
        einddatum = req.body.einddatum,
        klant_id = req.body.klant_id,
        lev_adres_id = req.body.lev_adres_id;
    let query = `insert into bestellingen (uitleendatum,einddatum,klant_id,lev_adres_id) values ('${uitleendatum}','${einddatum}','${klant_id}','${lev_adres_id}');`;
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(400).json(err); // Bad request
        }
        query = `SELECT LAST_INSERT_ID();`;
        db.query(query, (err, results) => {
            if (err) {
                console.log(err);
                res.status(400).json(err); //bad request
            }
            const bid = results[0]["LAST_INSERT_ID()"];
            const nieuw = {
                bestelling_id: bid,
                uitleendatum: uitleendatum,
                einddatum: einddatum,
                klant_id: klant_id,
                lev_adres_id: lev_adres_id
            };
            console.debug(nieuw);
            res.status(201).json(nieuw); // created
        });
    });
});

router.route('/bestellingen/bestelregels').post(function (req, res) {
    // request body format: { "itemId": 3, "bestelId": 29 }
    let itemId = req.body.itemId, bestelId = req.body.bestelId;
    let query = `insert into bestelregels (item_id,bestelling_id,Archief) values (${itemId},${bestelId},0);`;
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(400).json(err); // Bad request
        }
        query = `SELECT LAST_INSERT_ID();`;
        db.query(query, (err, results) => {
            if (err) {
                console.log(err);
                res.status(400).json(err); //bad request
            }
            const brid = results[0]["LAST_INSERT_ID()"];
            const nieuw = {bestelregelId: brid, itemId: itemId, bestelllingId: bestelId, Archief: false}
            console.debug(nieuw);
            res.status(201).json(nieuw); // created
        });
    });
});

router.get('/klant/:id/bestellingen', (req, res) => {
    let klant_id = req.params.id;
    const query = "select * from bestellingen where klant_id = ?;";
    db.query(query, [klant_id], (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        res.send(results);
    });
});

router.get('/bestellingen/:id/bestelregels', (req, res) => {
    let bestelId = req.params.id;
    const query = "select * from bestelregels where bestelling_id = ?;";
    db.query(query, [bestelId], (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        res.send(results);
    });
});

router.get('/bestellingen/:id', (req, res) => {
    let bestelId = req.params.id;
    const query = "select * from bestellingen where bestelling_id = ?;";
    db.query(query, [bestelId], (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        res.send(results[0]);
    });
});

router.get('/klanten/:id', (req, res) => {
    const klantId = req.params.id;
    const klanten = `select * from klanten where klant_id = ${klantId};`;
    db.query(klanten, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(results[0]);
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
    const kookGerei = "select * from producten where productnaam like '%gas%' or productnaam like '%bar%' or productnaam like '%kook%' or productnaam like '%mess%' or productnaam like '%servies%';";
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
    const zoekQuery = `select * from producten where productnaam like '%${term}%' or beschrijving like '%${term}%';`;
    db.query(zoekQuery, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(results);
    });
});

router.get('/getProduct/:id', (req, res) => {
    const id = req.params.id;
    const zoekQuery = `select * from producten where product_id like '${id}';`;
    db.query(zoekQuery, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(results);
    });
});

router.get('/getFreeItems/:id', (req, res) => {
    const id = req.params.id;
    const zoekQuery = `select * from items where product_id like '${id}' AND status='Vrij';`;
    db.query(zoekQuery, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(results);
    });
});

router.get('/getAllProducts', (req, res) => {
    const zoekQuery = `select * from producten;`;
    db.query(zoekQuery, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(results);
    });
});

router.get('/check/:uname', (req, res) => {
    const username = req.params.uname;
    const zoekQuery = `select * from login where username = ?;`;
    db.query(zoekQuery, [username], (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if(results.length < 1){
            res.status(204).json("Username is available.");
        } else {
            res.status(403).json("Username is already taken.");
        }
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
            db.query(maakAdres, [land, gemeente, postcode, straat, huisnummer, busnummer], (err, result, fields) => {
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

router.post('/insert/newKlantWithLogin', (req, res) => {
    let { voornaam, achternaam, geboortedatum, land, gemeente, postcode, straat, huisnummer, busnummer, username, password} = req.body;
    let klant = {
        klant_id: null,
        voornaam: voornaam,
        achternaam: achternaam,
        geboortedatum: geboortedatum,
        land:land,
        gemeente: gemeente,
        postcode: postcode,
        straat: straat,
        huisnummer: huisnummer,
        busnummer: busnummer
    };
    axios({
        method: 'POST',
        url: `http://10.3.50.56:3009/api/insert/newklant`,
        data: {
            voornaam: voornaam,
            achternaam: achternaam,
            geboortedatum: geboortedatum,
            land:land,
            gemeente: gemeente,
            postcode: postcode,
            straat: straat,
            huisnummer: huisnummer,
            busnummer: busnummer
        }
    }).then((resp) => {
        const klant_id = resp.data.klantId;
        klant.klant_id = klant_id;
            // TODO: insert new Login
        let query = 'insert into login (user_id, username, password) values (?, ?, ?);';
        db.query(query, [klant_id, username, password], (sqlErr, result) => {
            if(sqlErr) res.status(500).json(sqlErr);
            res.status(201).json({
                message: "Login successfully created.",
                klant: {
                    message: 'Success.'
                }
            }); // created
        });
    }).catch((err)=> {
        res.status(500).json(err);
        console.log(err);
    });
});

router.put('/bestellingen/:id', (req, res) => {
    let bestelling_id = req.params.id;
    console.log(bestelling_id);
    
    let { einddatum } = req.body;
    console.log(einddatum);
    
    let query = `update bestellingen set einddatum = ? where bestelling_id = ?;`;
    db.query(query, [einddatum, bestelling_id], (sqlErr, result) => {
        if(sqlErr) res.status(500).json(sqlErr);
        else {
            console.log(bestelling_id);
            res.status(204).json({
                message: "Date successfully updated.",
                bestelling: req.body
            });// created
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
        let checkUser = 'SELECT * FROM klanten WHERE voornaam LIKE ? AND achternaam LIKE ? AND geboortedatum LIKE ?;';
        let tempKlant;
        db.query(checkUser, [voornaam, achternaam, geboortedatum], (err, result) => {
            if (err) {
                return console.log(err);
            }
            // Als de klant al bestaat
            if (result[0]) {
                tempKlant = result[0];
                klantId = tempKlant.klant_id;
                console.log(klantId);
                // de klant zijn adres-id wijzigen naar het adres dat hij zo net heeft meegegeven en dat we opvangen van /api/insert/newAdres
                let changeAdres = "UPDATE klanten SET klant_adres_id = ? WHERE klant_id = ?;";
                db.query(changeAdres, [adresId, klantId], (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('changed adres_id to = ' + adresId);
                    res.send({
                        msg: "klant bestaat al",
                        klantId: klantId,
                        adresId: adresId
                    })
                })
            }
            // Wanneer de klant nog niet bestaat -> nieuwe klant aanmaken
            if (!result[0]) {
                let maakKlant = "INSERT INTO klanten(voornaam, achternaam, geboortedatum, klant_adres_id) VALUES(?,?,?,?);";
                db.query(maakKlant, [voornaam, achternaam, geboortedatum, adresId], (err, result) => {
                    if (err) {
                        return console.log(err);
                    }
                    klantId = result.insertId;
                    res.send({
                        msg: "klant is aangemaakt",
                        klantId: klantId,
                        adresId: adresId
                    })
                });
            }
        })
    }).catch((err)=> {
        console.log(err);
    });
});

router.route('/auth').post(function (req, res) {
    // request body format: { "username": ashot, "password": test }
    let username = req.body.username,
        password = req.body.password;
    let query =
        `SELECT
        k.klant_id,
        k.voornaam,
        k.achternaam,
        k.geboortedatum,
        a.adres_id,
        a.straatnaam,
        a.huisnummer,
        a.busnummer,
        a.postcode,
        a.gemeente,
        a.land
    FROM
        klanten k,
        login l,
        adressen a
    WHERE
        k.klant_id = l.user_id 
    AND k.klant_adres_id = a.adres_id 
    AND l.username = ? 
    AND l.password = ? limit 1;`;
    console.log(query, username, password);
    db.query(query, [username, password], (sqlErr, results) => {
        if (sqlErr) {
            res.status(400).json(sqlErr); // Bad request
        }

        if(results.length < 1 ) res.status(404).json({Unauthorized: "Invalid username or password."});

        res.status(200).json(results[0]);
    });
});

module.exports = router;
