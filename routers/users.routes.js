import { Router } from "express";
import { register } from "../controllers/users.controller.js";
/* import { signInBodyValidation } from "../middlewares/signInBodyValidation.middleware"; */
import { registerValidation } from "../middlewares/registerValidate.middleware.js";

const router = Router();

router.post("/register", registerValidation, register);
/* router.post("/users", signInBodyValidation, signIn); */

export default router;