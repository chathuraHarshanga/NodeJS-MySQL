const express = require("express");
const bodyParser = require("body-parser");

const beer = require("./controllers/beer.js");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/", beer);

//listen on port
app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost:${PORT}`)
);
