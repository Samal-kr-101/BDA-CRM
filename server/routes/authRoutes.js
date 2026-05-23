import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECK USER EXISTS
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User Registered Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;