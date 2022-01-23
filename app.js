import express from "express";
import bodyParser from "body-parser";

import beerRoutes from "./routes/BeerRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/", beerRoutes);

//listen on port
app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost:${PORT}`)
);
