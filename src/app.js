const express = require('express');
const app = express();

const path = require('path');

const expressLayouts = require('express-ejs-layouts');

const { baseRouter } = require('./routers/base.router.js');

const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.use(baseRouter);

app.listen(port, () => {
	console.log(`App started at http://localhost:${port}`);
});
