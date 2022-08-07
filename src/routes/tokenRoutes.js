import { Router } from "express";
const router = new Router();

import TokenController from "../controllers/TokenController";

router.post("/", TokenController.create);

export default router;

/**
 * index = lista todos usuarios => GET
 * strore/create = cria novo usuario => POST
 * delete = apaga => DELETE
 * show = mostra => GET
 * update = atualiza => PATCH/PUT
 */
