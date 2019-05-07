const express = require('express');
const app = express();
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});