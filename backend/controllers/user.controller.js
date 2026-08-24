import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import { sendVerificationEmail } from "../utils/mailer.js";
export const register = async (req, res) => {
  try {
    const { fullname, email: rawEmail, phoneNumber, password, role } = req.body;
    const email = rawEmail?.trim().toLowerCase();
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address", success: false });
    }
    const file = req.file;
    let profilePhoto = "";
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhoto = cloudResponse.secure_url;
    }
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user = await User.create({
      fullname,
      email,
      phoneNumber,
      role,
      password: hashedPassword,
      emailVerificationToken: crypto.createHash("sha256").update(verificationToken).digest("hex"),
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      profile: {
        profilePhoto,
      },
    });
    await sendVerificationEmail({ email, name: user.fullname, token: verificationToken });
    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Unable to register user", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email: rawEmail, password, role } = req.body;
    const email = rawEmail?.trim().toLowerCase();
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect Email or password", success: false });
    }
    if (!user.isEmailVerified) {
      return res.status(403).json({ message: "Please verify your email before signing in", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect Email or password", success: false });
    }
    //role check
    if (role != user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .json({
        message: `Welcome back${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    return res.status(500).json({ message: "Unable to login", success: false });
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token").json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to logout", success: false });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Verification token is required", success: false });
    }
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      emailVerificationToken: tokenHash,
      emailVerificationExpires: { $gt: new Date() },
    }).select("+emailVerificationToken +emailVerificationExpires");
    if (!user) {
      return res.status(400).json({ message: "This verification link is invalid or expired", success: false });
    }
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Unable to verify email", success: false });
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const user = await User.findOne({ email });
    if (!user || user.isEmailVerified) {
      return res.status(200).json({ message: "If the account exists, a verification email has been sent", success: true });
    }
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.emailVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
    user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();
    await sendVerificationEmail({ email: user.email, name: user.fullname, token: verificationToken });
    return res.status(200).json({ message: "Verification email sent", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Unable to send verification email", success: false });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist", success: false });
    }
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    //cloudinary aayega idhar

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    if (fullname) {
      user.fullname = fullname;
    }
    if (email) {
      user.email = email;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    if (skills) {
      user.profile.skills = skillsArray;
    }

    //resume section

    await user.save();
    const safeUser = user.toObject();
    delete safeUser.password;
    return res.status(200).json({
      message: "Profile updated successfully",
      user: safeUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update profile", success: false });
  }
};
export const verifytoken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.replace(/^Bearer\s+/i, "");
    if (!token || !process.env.GOOGLE_CLIENT_ID) {
      return res.status(401).json({ message: "Google authentication is not configured", success: false });
    }
    const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    req.user = ticket.getPayload();
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Invalid Google token", success: false });
  }
};

export const gogleauth = async (req, res) => {
  try {
    const { name, email, picture } = req.user;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ fullname: name || email.split("@")[0], email, phoneNumber: 0, password: await bcrypt.hash(jwt.sign({ email }, process.env.SECRET_KEY), 10), role: 'student', profile: { profilePhoto: picture || "" } });
      await user.save();
    }
    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
      await user.save();
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
    const safeUser = user.toObject();
    delete safeUser.password;
    return res.status(201).cookie("token", token, {
      maxAge: 86400000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }).json({ success: true, user: safeUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error in registering " });
  }
}

export const goglelogin = async (req, res) => {
  try {
    const { name, email, picture } = req.user;
  
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ fullname: name || email.split("@")[0], email, phoneNumber: 0, password: await bcrypt.hash(jwt.sign({ email }, process.env.SECRET_KEY), 10), role: 'student', profile: { profilePhoto: picture || "" } });
      await user.save();
    }
    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
      await user.save();
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
    const safeUser = user.toObject();
    delete safeUser.password;
    return res.status(200).cookie("token", token, { maxAge: 86400000, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" }).json({ success: true, message: "Login successful", user: safeUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error in registering " });
  }
}
