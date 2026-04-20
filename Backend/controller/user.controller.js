import { user } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/Cloudinary.js";
export const register = async (req, resp) => {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;
    const file = req.file;
    let profilePhotoUrl = "";
    if (file) {
      const fileuri = getDataUri(file);

      const cloudResponse = await cloudinary.uploader.upload(fileuri.content);

      profilePhotoUrl = cloudResponse.secure_url;
    }

    if (!fullname || !email || !phonenumber || !password || !role) {
      return resp.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return resp.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
      profile: {
        profilephoto: profilePhotoUrl || "",
      },
    });

    return resp.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return resp.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, resp) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return resp.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    let existingUser = await user.findOne({ email });

    if (!existingUser) {
      return resp.status(400).json({
        message: "Invalid email id or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordMatch) {
      return resp.status(400).json({
        message: "Password is Incorrect.",
        success: false,
      });
    }

    if (role !== existingUser.role) {
      return resp.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }

    const tokendata = {
      userid: existingUser._id,
    };

    const token = jwt.sign(tokendata, process.env.scret_key, {
      expiresIn: "1d",
    });

    const User = {
      _id: existingUser._id,
      fullname: existingUser.fullname,
      email: existingUser.email,
      phonenumber: existingUser.phonenumber,
      role: existingUser.role,
      profile: existingUser.profile,
    };

    return resp
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        message: `Welcome back ${User.fullname}`,
        User,
        success: true,
      });
  } catch (error) {
    console.log(error);

    return resp.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, resp) => {
  try {
    resp.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return resp.status(200).json({
      message: "Logout successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateprofile = async (req, resp) => {
  try {
    const userid = req.id;
    const file = req.file;
    const fileuri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileuri.content);
    const { fullname, email, phonenumber, bio, skills } = req.body;

    if (
      !fullname?.trim() &&
      !email?.trim() &&
      !phonenumber?.trim() &&
      !bio?.trim() &&
      !skills?.trim() &&
      !cloudResponse
    ) {
      return resp.status(400).json({
        message: "No data provided to update.",
        success: false,
      });
    }

    const skillsarray = skills
      ? skills.split(",").map((skill) => skill.trim())
      : [];

    const User = await user.findById(userid);

    if (!User) {
      return resp.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (!User.profile) {
      User.profile = {};
    }

    if (fullname) User.fullname = fullname;
    if (email) User.email = email;
    if (phonenumber) User.phonenumber = phonenumber;
    if (bio) User.profile.bio = bio;
    if (skills) User.profile.skills = skillsarray;

    if (cloudResponse) {
      User.profile.resume = cloudResponse.secure_url;
      User.profile.resumeOriginalName = file.originalname;
    }

    await User.save();

    const updatedUser = {
      _id: User._id,
      fullname: User.fullname,
      email: User.email,
      phonenumber: User.phonenumber,
      role: User.role,
      profile: User.profile,
    };

    return resp.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return resp.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getprofile = async (req, resp) => {
  try {
    const id = req.id;

    const User = await user.findById(id);

    if (!User) {
      return resp.status(400).json({
        message: "Please Login Again",
        success: false,
      });
    }

    return resp.status(200).json({
      User,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return resp.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
