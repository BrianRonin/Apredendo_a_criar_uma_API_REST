import { Router } from "express";
const router = new Router();

import UserController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";

router.post("/", loginRequired, UserController.create); //create staff
router.get("/", loginRequired, UserController.index); //list all staffs
router.put("/:id", loginRequired, UserController.update); // update a staff
router.get("/:id", loginRequired, UserController.show); // show a staff
router.delete("/:id", loginRequired, UserController.delete); // delete a staff

export default router;

/**
 * index = lista todos usuarios => GET
 * strore/create = cria novo usuario => POST
 * delete = apaga => DELETE
 * show = mostra => GET
 * update = atualiza => PATCH/PUT
 */
