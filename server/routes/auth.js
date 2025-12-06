// server/routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });

  try {
    const [rows] = await db.query("SELECT id, name, email, password_hash, role FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET /api/auth/me (protected)
import { verifyToken } from "../middleware/auth.js";
router.get("/me", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email, role FROM users WHERE id = ?", [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });
    return res.json({ user: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
