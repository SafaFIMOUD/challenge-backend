"use strict";
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const app = express();
const port = 3002;

app.set("view engine", "pug");

// App middlewares
app.use(morgan("dev"));
app.use("/static", express.static("./static"));

// App routes
app.use("/", require("./router"));

// App initialisation

// Démarrage de l'application Node.js
db.initClientDbConnection()
    .then(() => {
      app.listen(port);
      console.log(`http://localhost:${port}`);
    })
    .catch((err) => console.log(Error))