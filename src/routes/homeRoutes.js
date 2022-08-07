import { Router } from "express";
const router = new Router();

import HomeController from "../controllers/HomeController";
router.get("/", HomeController.index);

export default router;
