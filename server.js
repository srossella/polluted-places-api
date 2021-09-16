const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { router } = require('./routes/places.js');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(cors())
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
  


