import { Router } from "express";
import { register, signIn } from "../controllers/users.controller.js";
import { signInBodyValidation } from "../middlewares/registerValidate.middleware.js";
import { registerValidation } from "../middlewares/registerValidate.middleware.js";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/users", signInBodyValidation, signIn);

export default router;