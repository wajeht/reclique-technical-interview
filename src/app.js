const express = require("express");
const app = express();

const path = require("path");

const expressLayouts = require("express-ejs-layouts");

const { baseRouter } = require("./routers/base.router.js");

// setting templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// serving public files
app.use(express.static(path.join(__dirname, "public")));

// parsing request into readable data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.use(baseRouter);

module.exports = app;
