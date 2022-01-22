const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

//MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "node_sql",
});

app.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * from beers", (err, rows) => {
      connection.release(); // return the connection to pool

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }

      // if(err) throw err
      console.log("The data from beer table are: \n", rows);
    });
  });
});

//listen on port
app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost:${PORT}`)
);
