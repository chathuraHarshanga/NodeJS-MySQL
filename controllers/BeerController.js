import { createPool } from "mysql";

const pool = createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "node_sql",
});

export const getAllBeers = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM beers", (err, rows) => {
      connection.release(); // return the connection to pool
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
};

export const getBeer = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT * FROM beers WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release(); // return the connection to pool
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
};

export const deleteBeer = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "DELETE FROM beers WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release(); // return the connection to pool
        if (!err) {
          res.send(
            `Beer with the record ID ${[req.params.id]} has been removed.`
          );
        } else {
          console.log(err);
        }
      }
    );
  });
};

export const addBeer = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    const params = req.body;
    connection.query("INSERT INTO beers SET ?", params, (err, rows) => {
      connection.release(); // return the connection to pool
      if (!err) {
        res.send(`Beer with the record ID  has been added.`);
      } else {
        console.log(err);
      }

      console.log("The data from beer table are:11 \n", rows);
    });
  });
};
