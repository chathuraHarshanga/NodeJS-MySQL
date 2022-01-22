const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

//MySQL

//listen on port
app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost:${PORT}`)
);
