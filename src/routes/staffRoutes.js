import { Router } from "express";
const router = new Router();

import StaffController from "../controllers/StaffController";
import loginRequired from "../middlewares/loginRequired";

router.post("/", StaffController.create); //create staff
router.get("/", StaffController.index); //list all staffs
router.get("/:id", loginRequired, StaffController.show); // show a staff
router.put("/", loginRequired, StaffController.update); // update a staff
router.delete("/:id", loginRequired, StaffController.delete); // delete a staff

export default router;

/**
 * index = lista todos usuarios => GET
 * strore/create = cria novo usuario => POST
 * delete = apaga => DELETE
 * show = mostra => GET
 * update = atualiza => PATCH/PUT
 */
