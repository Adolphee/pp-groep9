const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
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
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));

// The route to get all the different data and post data from and to database
app.use('/api', api);

// The route to handle login & registration
app.use('/user', user);

// The route to handle the contact form
app.use('/contact', submitForm);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});