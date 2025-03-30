import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import admin from '../firebase.js';
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      role,
      password: hashedPassword,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });
    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
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
        maxage: 1 * 24 * 60 * 60 * 1000,
        httpsOly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token").json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
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
    const userId = req.id; //middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
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
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const verifytoken = async (req, res, next) => {
  try {
    const token = req.headers.authorization; 
    console.log('Verifying token...');

    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const decodedUser = await admin.auth().verifyIdToken(token);

    req.user = decodedUser;
    next(); 
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const gogleauth = async (req, res) => {
  try {
    const { name, email, picture } = req.user;
  
    let user = User.findOne({ email });
    if (!user) {
      user = new User({ name, email, role: 'student' });
      await user.save();
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error in registering " });
  }
}

export const goglelogin = async (req, res) => {
  try {
    const { name, email, picture } = req.user;
  
    let user = User.findOne({ email });
    if (!user) {
      user = new User({ name, email, role: 'student' });
      await user.save();
    }
    
    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error in registering " });
  }
}
