const express = require('express');
const app = express();
const api = require('./routes/api');
const user = require('./routes/user');

const PORT = process.env.PORT || 3000;

// Middleware
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.urlencoded({extended: false}));

// The route to get all the different products
app.use('/api', api);

// The route to handle login & registration
app.use('/user', user);

app.get('/', (req, res) => {
  res.send(`
    <h2>This is the webserver that interacts with the front-end.</h2>
    <p>We have the /api route where you can request all the data.</p>
    <h3><b>/api</b> followed by one of these</h3>
    <p>For example /api/tenten will get you all the tenten</p>
    <ul>
      <li>/tenten</li>
      <li>/slaapGerief</li>
      <li>/search/"searchTerm"</li>
    </ul>
  `);
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});