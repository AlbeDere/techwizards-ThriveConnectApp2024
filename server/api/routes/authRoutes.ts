import express from "express";
import { loginHandler } from "../controllers/authController";

const router = express.Router();

router.post("/login", loginHandler);

export default router;
