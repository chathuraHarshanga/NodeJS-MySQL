import express from "express";
import {
  getAllBeers,
  getBeer,
  deleteBeer,
} from "../controllers/BeerController.js";
const router = express.Router();

router.get("/", getAllBeers);

router.get("/:id", getBeer);

router.delete("/:id", deleteBeer);

export default router;
