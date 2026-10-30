const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

module.exports = (User) => {

    // REGISTER
    router.post("/register", async (req, res) => {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({
                    message: "All fields are required",
                });
            }

            const existingUser = await User.findOne({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({
                    message: "Email already registered",
                });
            }

            const hashedPassword = await bcrypt.hash(
                password,
                10
            );

            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                role: "user",
            });

            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
            });

        } catch (error) {
            res.status(500).json({
                message: "Registration failed",
                error: error.message,
            });
        }
    });


    // LOGIN
    router.post("/login", async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({
                where: { email },
            });

            if (!user) {
                return res.status(401).json({
                    message: "Invalid email or password",
                });
            }

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Invalid email or password",
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d",
                }
            );

            res.json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
            });

        } catch (error) {
            res.status(500).json({
                message: "Login failed",
                error: error.message,
            });
        }
    });

    return router;
};