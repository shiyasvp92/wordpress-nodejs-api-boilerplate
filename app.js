// app.js
var express = require('express');
var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.json());
 
// create application/json parser
var jsonParser = bodyParser.json()

var controller = require('./controller');
app.use('/', jsonParser, controller);

module.exports = app;