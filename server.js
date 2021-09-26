const express = require('express');
const path = require('path')
require('dotenv').config()
const cors = require('cors');
const { router } = require('./routes/places.js');
const app = express();
const PORT = process.env.PORT || 8000;

app.use('/uploads', express.static(path.resolve(__dirname, './uploads')));
app.use(cors())
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
  


