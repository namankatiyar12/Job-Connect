import express from "express";

import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
import { requireRole } from "../middleware/authorize.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated,requireRole("recruiter"),postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated,requireRole("recruiter"),getAdminJobs);
router.route("/get/:id").get(getJobById);

export default router;