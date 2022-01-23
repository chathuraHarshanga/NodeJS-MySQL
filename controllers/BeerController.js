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
          console.log("get req on", rows[0].name);
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

export const updateBeer = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const { id, name, tagline, description, image } = req.body;

    connection.query(
      "UPDATE beers SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ?",
      [name, tagline, description, image, id],
      (err, rows) => {
        connection.release(); // return the connection to pool

        if (!err) {
          res.send(`Beer with the name: ${name} has been updated.`);
        } else {
          console.log(err);
        }
      }
    );

    // console.log(req.body);
  });
};
