import { Router } from "express";
import { getItems, createItem, borrowItem, returnItem } from "../controllers/itemController";

const router = Router();

router.get("/", getItems);
router.post("/", createItem);
router.post("/borrow", borrowItem);
router.post("/return", returnItem);

export default router;