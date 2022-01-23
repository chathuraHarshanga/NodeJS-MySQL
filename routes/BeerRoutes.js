import express from "express";
import {
  getAllBeers,
  getBeer,
  deleteBeer,
  addBeer,
  updateBeer,
} from "../controllers/BeerController.js";
const router = express.Router();

router.get("/", getAllBeers);

router.get("/:id", getBeer);

router.delete("/:id", deleteBeer);

router.post("", addBeer);

router.put("", updateBeer);

export default router;
