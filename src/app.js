const express = require('express');
const app = express();

const path = require('path');

const expressLayouts = require('express-ejs-layouts');

const { baseRouter } = require('./routers/base.router.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.use(baseRouter);

module.exports = app;
