"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    const { username, email, password, userRoleId } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    try {
        const user = await prisma_1.default.user_account.create({
            data: {
                username,
                email,
                password: hashedPassword,
                user_role_id: userRoleId,
            },
        });
        const token = (0, jwt_1.generateToken)(user.id);
        res.status(201).json({ token });
    }
    catch (err) {
        res.status(400).json({ error: "User already exists" });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma_1.default.user_account.findUnique({ where: { email } });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = (0, jwt_1.generateToken)(user.id);
        res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.login = login;
