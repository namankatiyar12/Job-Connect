import express from "express";
import { gogleauth, goglelogin, login, logout, register, resendVerificationEmail, updateProfile, verifyEmail, verifytoken } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/verify-email").get(verifyEmail);
router.route("/resend-verification").post(resendVerificationEmail);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/goglesignup").post(verifytoken, gogleauth);
router.route("/goglelogin").post(verifytoken, goglelogin);
// goglelogin
export default router;
