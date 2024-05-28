import { Request, Response, Router } from "express";
import { authRegister, authLogin, checkPassword } from "../controllers/auth.controller";

const router = Router();
router.post("/register", authRegister);
router.post("/login", authLogin);
router.post("/checkPassword", checkPassword);

export { router };