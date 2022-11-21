import { Router } from "express";
import { register, signIn } from "../controllers/users.controller.js";
import { entry } from "../controllers/balance.controller.js";
import { signInBodyValidation } from "../middlewares/registerValidate.middleware.js";
import { registerValidation } from "../middlewares/registerValidate.middleware.js";
import { balanceValidation } from "../middlewares/balanceValidate.middleware.js";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/users", signInBodyValidation, signIn);
router.post("/entry", balanceValidation, entry);


export default router;