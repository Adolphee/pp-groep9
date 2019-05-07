const express = require('express');
const app = express();
const camping = require('./routes/camping');

const PORT = process.env.PORT || 3000;

app.use('/camping', camping);

app.get('/', (req, res) => {
  res.send('Hello this is the webserver with all the endpoints to get all the camping information');
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});