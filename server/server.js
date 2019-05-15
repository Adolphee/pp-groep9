const express = require('express');
const app = express();
const api = require('./routes/api');
const user = require('./routes/user');
const submitForm = require('./routes/submitForm');

const PORT = process.env.PORT || 3009;

// Middleware
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// The route to get all the different data and post data from and to database
app.use('/api', api);

// The route to handle login & registration
app.use('/user', user);

// The route to handle the contact form
app.use('/contact', submitForm);

app.get('/', (req, res) => {
  res.send(`
    <h2>This is the webserver that interacts with the front-end.</h2>
    <p>We have the /api route where you can request all the data.</p>
    <h3>get routes</h3>
    <ul>
      <li>api/tenten</li>
      <li>api/slaapGerief</li>
      <li>api/kookGerei</li>
      <li>api/search/"searchTerm"</li>
      <li>api/getProduct/:id</li>
      <li>api/getFreeItems/:id</li>
    </ul>
    <h3>post routes</h3>
    <ul>
      <li>
        api/insert/newAdres
        <br> gebruik deze data <br> 
        {
          "land": "BE",
          "gemeente": "opwijk",
          "postcode": "1745",
          "straat": "steenweg",
          "huisnummer": "45",
          "busnummer":""
        }
        <br>
        en heraal de post nog is om te kijken of het al bestaat
      </li>
      <br>
      <li>
        api/insert/newKlant (bij nieuwe klant moet er altijd een adres meegegeven worden)
        <br> gebruik deze data <br> 
        {
          "voornaam": "olivier",
          "achternaam": "bogaert",
          "geboortedatum": "02/05/1973",
          "land": "be",
          "gemeente": "lembeek",
          "postcode": "1502",
          "straat": "popstraat",
          "huisnummer": "17",
          "busnummer": ""
        }
        <br>
        en heraal de post nog is om te kijken of het al bestaat
      </li>
    </ul>
  `);
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});