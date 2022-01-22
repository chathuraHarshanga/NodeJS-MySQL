const mysql = require("mysql");
const express = require("express");
const router = express("router");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "node_sql",
});

router.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * FROM beers", (err, rows) => {
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

module.exports = router;
