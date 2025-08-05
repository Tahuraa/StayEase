import express from "express";
import User from "../models/users.js";
import fetchUser from "../middleware/fetchuser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();
const JWT_SECRET = "this_is_secret"; // Ensure this is set in your environment variables

import { check, validationResult } from 'express-validator';

router.post(
  "/createuser",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // If validation fails
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save new user
      const user = new User({
        email,
        password: hashedPassword,
      });

      await user.save();
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);


// POST /api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // If validation fails
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Match password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Generate token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);


// GET /api/auth/getuser
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    // res.status(200).json(user);
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});




export default router;