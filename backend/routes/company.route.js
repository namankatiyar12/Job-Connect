import express from "express";
import { getCompany, getCompanyById, registerComapny, updateCompany } from "../controllers/company.controller.js";
import { requireRole } from "../middleware/authorize.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();

router.route("/register").post(isAuthenticated,requireRole("recruiter"),registerComapny);
router.route("/get").get(isAuthenticated,requireRole("recruiter"),getCompany);
router.route("/get/:id").get(isAuthenticated,requireRole("recruiter"),getCompanyById);
router.route("/update/:id").put(isAuthenticated,requireRole("recruiter"),singleUpload,updateCompany);
export default router;