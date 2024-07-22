"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memberController_1 = require("../controllers/memberController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
/**
 * @swagger
 * /api/members:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     description: Adds a new member to the library.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       description: Member object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               expiry_date:
 *                 type: string
 *                 format: date
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: "Unauthorized"
 *       500:
 *         description: Internal server error
 */
router.post("/members", authMiddleware_1.authMiddleware, memberController_1.createMember);
/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Retrieve all members
 *     tags: [Members]
 *     description: Get a list of all members in the library.
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: List of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 *       401:
 *         description: "Unauthorized"
 *       500:
 *         description: Internal server error
 */
router.get("/members", authMiddleware_1.authMiddleware, memberController_1.getMembers);
/**
 * @swagger
 * /api/members/{id}:
 *   get:
 *     summary: Retrieve a member by ID
 *     tags: [Members]
 *     description: Get a single member's details by their ID.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the member to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not found
 *       401:
 *         description: "Unauthorized"
 *       500:
 *         description: Internal server error
 */
router.get("/members/:id", authMiddleware_1.authMiddleware, memberController_1.getMemberById);
/**
 * @swagger
 * /api/members/{id}:
 *   put:
 *     summary: Update a member
 *     tags: [Members]
 *     description: Update details of an existing member.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the member to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Member object with updated details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               expiry_date:
 *                 type: string
 *                 format: date
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Member updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Member not found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: "Unauthorized"
 */
router.put("/members/:id", authMiddleware_1.authMiddleware, memberController_1.updateMember);
/**
 * @swagger
 * /api/members/{id}:
 *   delete:
 *     summary: Delete a member
 *     tags: [Members]
 *     description: Remove a member from the library.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the member to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Member deleted successfully
 *       404:
 *         description: Member not found
 *       500:
 *         description: Internal server error
 */
router.delete("/members/:id", authMiddleware_1.authMiddleware, memberController_1.deleteMember);
exports.default = router;
