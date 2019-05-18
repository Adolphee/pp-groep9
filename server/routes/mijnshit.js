router.route('/bestellingen').post(function (req, res) {
  let uitleendatum = req.body.uitleendatum,
      einddatum    = req.body.einddatum,
      klant_id     = req.body.klant_id,
      lev_adres_id = req.body.lev_adres_id;
  /*
  * {
                    uitleendatum: startDatum,
                    einddatum: eindDatum,
                    klant_id: klant.klant_id,
                    lev_adres_id: klant.klant_adres_id
   *}
   * */
  //
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

router.get('/bestellingen', (req, res) => {
    const bestellingen = "select * from bestellingen";
    db.query(bestellingen, (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(results);
    });
  });

  router.get('/klanten/:id', (req, res) => {
    const klantId = req.params.id;
    const klanten = `select * from klanten where klant_id = ${klantId};`;
    db.query(klanten, (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(results[0]);
    });
  });

  router.get('/search/prijs/gt/:term', (req, res) => {
    const term = req.params.term;
    const zoekQuery = `select * from producten where prijs > ${term};`;
    db.query(zoekQuery, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(results);
    });
  });
  
  router.get('/search/prijs/lt/:term', (req, res) => {
    const term = req.params.term;
    const zoekQuery = `select * from producten where prijs < ${term};`;
    db.query(zoekQuery, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(results);
    });
  });
  
  router.get('/search/prijs/eq/:term', (req, res) => {
    const term = req.params.term;
    const zoekQuery = `select * from producten where prijs = ${term};`;
    db.query(zoekQuery, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(results);
    });
  });