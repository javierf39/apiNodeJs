const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const router = require('./routes/pelicula');

const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use('/public', express.static(`${__dirname}/static/img`));
app.use(cors());
app.use(router);



module.exports = app;