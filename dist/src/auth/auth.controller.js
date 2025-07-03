"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = exports.verifyUserController = exports.createUserController = void 0;
const auth_service_1 = require("./auth.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../mailer/mailer");
const createUserController = async (req, res) => {
    try {
        const user = req.body;
        // Check for existing user
        const existingUser = await (0, auth_service_1.getUserByEmailService)(user.email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        // Hash password
        const hashedPassword = bcryptjs_1.default.hashSync(user.password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const newUser = {
            ...user,
            password: hashedPassword,
            verificationCode,
            isVerified: false,
            role: "user"
        };
        const createdUser = await (0, auth_service_1.createUserService)(newUser);
        // Send verification email
        await (0, mailer_1.sendEmail)(user.email, "Verify your account", `Hello ${user.lastName}, your verification code is: ${verificationCode}`, `<div>
          <h2>Hello ${user.lastName},</h2>
          <p>Your verification code is: <strong>${verificationCode}</strong></p>
          <p>Enter this code to verify your account.</p>
      </div>`);
        return res.status(201).json({
            message: "User created. Verification code sent to email.",
            user: {
                id: createdUser.id,
                email: createdUser.email,
                firstName: createdUser.firstName,
                lastName: createdUser.lastName
            }
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ error: error.message });
    }
};
exports.createUserController = createUserController;
const verifyUserController = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await (0, auth_service_1.getUserByEmailService)(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.verificationCode !== code) {
            return res.status(400).json({ message: "Invalid verification code" });
        }
        await (0, auth_service_1.verifyUserService)(email);
        await (0, mailer_1.sendEmail)(email, "Account Verified Successfully", `Hello ${user.lastName}, your account has been verified.`, `<div>
          <h2>Hello ${user.lastName},</h2>
          <p>Your account has been verified successfully!</p>
      </div>`);
        return res.status(200).json({ message: "User verified successfully" });
    }
    catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({ error: error.message });
    }
};
exports.verifyUserController = verifyUserController;
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await (0, auth_service_1.userLoginService)(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: "Account not verified" });
        }
        const passwordValid = bcryptjs_1.default.compareSync(password, user.password);
        if (!passwordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({
            sub: user.id,
            user_id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 1 day expiry
        }, process.env.JWT_SECRET);
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: error.message });
    }
};
exports.loginUserController = loginUserController;
