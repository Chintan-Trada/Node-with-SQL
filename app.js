const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('./middleware/config.js');

const handleResponse  = require('./helper/response.helper');
const JoiErrors = require('./helper/error.helper');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || config.PORT;

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/', require('./route/route'));

app.use(handleResponse);

app.use(JoiErrors.handleJoiErrors);

app.use(JoiErrors.handleErrors);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))