"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAccount = exports.updateUserAccount = exports.getUserAccountById = exports.getAllUserAccounts = exports.createUserAccount = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const types_1 = require("../types");
const createUserAccount = async (req, res) => {
    const { user_role_id, email, username, password, is_activated = false, is_active = true, } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const userAccount = await prisma_1.default.user_account.create({
            data: {
                user_role_id,
                email,
                username,
                password: hashedPassword,
                is_activated,
                is_active,
            },
        });
        res.status(201).json(userAccount);
    }
    catch (error) {
        const errorMessage = error instanceof types_1.CustomError ? error.message : "Internal Server Error";
        res.status(error.statusCode || 500).json({ error: errorMessage });
    }
};
exports.createUserAccount = createUserAccount;
const getAllUserAccounts = async (req, res) => {
    try {
        const userAccounts = await prisma_1.default.user_account.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                is_activated: true,
                is_active: true,
                created_at: true,
                updated_at: true,
                user_role: {
                    select: {
                        id: true,
                        user_role_name: true,
                    },
                },
            },
        });
        res.status(200).json(userAccounts);
    }
    catch (error) {
        const errorMessage = error instanceof types_1.CustomError ? error.message : "Internal Server Error";
        res.status(error.statusCode || 500).json({ error: errorMessage });
    }
};
exports.getAllUserAccounts = getAllUserAccounts;
const getUserAccountById = async (req, res) => {
    const { id } = req.params;
    try {
        const userAccount = await prisma_1.default.user_account.findUnique({
            select: {
                id: true,
                email: true,
                username: true,
                is_activated: true,
                is_active: true,
                created_at: true,
                updated_at: true,
                user_role: {
                    select: {
                        id: true,
                        user_role_name: true,
                    },
                },
            },
            where: { id: Number(id) },
        });
        if (userAccount) {
            res.status(200).json(userAccount);
        }
        else {
            res.status(404).json({ error: "User account not found" });
        }
    }
    catch (error) {
        const errorMessage = error instanceof types_1.CustomError ? error.message : "Internal Server Error";
        res.status(error.statusCode || 500).json({ error: errorMessage });
    }
};
exports.getUserAccountById = getUserAccountById;
const updateUserAccount = async (req, res) => {
    const { id } = req.params;
    const { user_role_id, email, username, password, is_activated, is_active } = req.body;
    try {
        const userAccount = await prisma_1.default.user_account.update({
            select: {
                id: true,
                email: true,
                username: true,
                is_activated: true,
                is_active: true,
                created_at: true,
                updated_at: true,
                user_role: {
                    select: {
                        id: true,
                        user_role_name: true,
                    },
                },
            },
            where: { id: Number(id) },
            data: {
                user_role_id,
                email,
                username,
                password,
                is_activated,
                is_active,
            },
        });
        res.status(200).json(userAccount);
    }
    catch (error) {
        const errorMessage = error instanceof types_1.CustomError ? error.message : "Internal Server Error";
        res.status(error.statusCode || 500).json({ error: errorMessage });
    }
};
exports.updateUserAccount = updateUserAccount;
const deleteUserAccount = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma_1.default.user_account.delete({ where: { id: Number(id) } });
        res.status(200).json({ message: "User account deleted" });
    }
    catch (error) {
        const errorMessage = error instanceof types_1.CustomError ? error.message : "Internal Server Error";
        res.status(error.statusCode || 500).json({ error: errorMessage });
    }
};
exports.deleteUserAccount = deleteUserAccount;
