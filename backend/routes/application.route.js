import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import { requireRole } from "../middleware/authorize.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated,requireRole("student"),applyJob);
router.route("/get").get(isAuthenticated,requireRole("student"),getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,requireRole("recruiter"),getApplicants);
router.route("/status/:id/update").post(isAuthenticated,requireRole("recruiter"),updateStatus)
export default router;