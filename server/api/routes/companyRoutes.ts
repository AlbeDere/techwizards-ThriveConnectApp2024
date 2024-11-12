import express from "express";

import {
  createCompanyHandler,
  deleteCompanyHandler,
  getAllCompanies,
  getCompanyByIdHandler,
  updateCompanyProfileHandler,
} from "../controllers/companyControllers";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

//Public routes
router.post("/", createCompanyHandler);
router.get("/", getAllCompanies);

// Protected routes
router.get("/:id", getCompanyByIdHandler);
router.put("/:id", authenticateToken, updateCompanyProfileHandler);
router.delete("/:id", authenticateToken, deleteCompanyHandler);

export default router;
