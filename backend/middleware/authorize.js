import { User } from "../models/user.model.js";

export const requireRole = (...roles) => async (req, res, next) => {
  try {
    const user = await User.findById(req.id).select("role");
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
        success: false,
      });
    }
    req.userRole = user.role;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Authorization failed", success: false });
  }
};