"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.getMemberById = exports.getMembers = exports.createMember = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const types_1 = require("../types");
const short_unique_id_1 = __importDefault(require("short-unique-id"));
// Create a new member
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, date_of_birth, address, phone_number, email, start_date, expiry_date, is_active, } = req.body;
    const parsedDateOfBirth = new Date(date_of_birth);
    const parsedStartDate = new Date(start_date);
    const parsedExpiryDate = new Date(expiry_date);
    if (!(0, types_1.isValidMemberData)({
        fullname,
        date_of_birth: parsedDateOfBirth,
        address,
        phone_number,
        email,
        start_date: parsedStartDate,
        expiry_date: parsedExpiryDate,
        is_active,
    })) {
        return res.status(400).json({ error: "Invalid member data" });
    }
    try {
        const uid = new short_unique_id_1.default({ length: 6 });
        const member = yield prisma_1.default.member.create({
            data: {
                member_code: uid().toString().toUpperCase(),
                fullname,
                date_of_birth: parsedDateOfBirth,
                address,
                phone_number,
                email,
                start_date: parsedStartDate,
                expiry_date: parsedExpiryDate,
                is_active,
            },
        });
        res.status(201).json(member);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating member" });
    }
});
exports.createMember = createMember;
// Get all members
const getMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield prisma_1.default.member.findMany();
        res.status(200).json(members);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching members" });
    }
});
exports.getMembers = getMembers;
// Get a single member by ID
const getMemberById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const member = yield prisma_1.default.member.findUnique({
            where: { id: Number(id) },
        });
        if (member) {
            res.status(200).json(member);
        }
        else {
            res.status(404).json({ error: "Member not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching member" });
    }
});
exports.getMemberById = getMemberById;
// Update a member
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { fullname, date_of_birth, address, phone_number, email, start_date, expiry_date, is_active, } = req.body;
        const parsedDateOfBirth = new Date(date_of_birth);
        const parsedStartDate = new Date(start_date);
        const parsedExpiryDate = new Date(expiry_date);
        if (!(0, types_1.isValidMemberData)({
            fullname,
            date_of_birth: parsedDateOfBirth,
            address,
            phone_number,
            email,
            start_date: parsedStartDate,
            expiry_date: parsedExpiryDate,
            is_active,
        })) {
            return res.status(400).json({ error: "Invalid member data" });
        }
        const updatedMember = yield prisma_1.default.member.update({
            where: { id: Number(id) },
            data: {
                fullname,
                date_of_birth: parsedDateOfBirth,
                address,
                phone_number,
                email,
                start_date: parsedStartDate,
                expiry_date: parsedExpiryDate,
                is_active,
            },
        });
        res.status(200).json(updatedMember);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating member" });
    }
});
exports.updateMember = updateMember;
// Delete a member
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma_1.default.member.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting member" });
    }
});
exports.deleteMember = deleteMember;
