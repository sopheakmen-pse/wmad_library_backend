"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAccountController_1 = require("../controllers/userAccountController");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/user_accounts:
 *   post:
 *     summary: Create a new user account
 *     description: Create a new user account with the specified details.
 *     tags:
 *       - User Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_role_id:
 *                 type: integer
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               is_activated:
 *                 type: boolean
 *                 default: false
 *               is_active:
 *                 type: boolean
 *                 default: true
 *             required:
 *               - user_role_id
 *               - email
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *                 is_activated:
 *                   type: boolean
 *                 is_active:
 *                   type: boolean
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/user_accounts", userAccountController_1.createUserAccount);
/**
 * @openapi
 * /api/user_accounts:
 *   get:
 *     summary: Get all user accounts
 *     description: Retrieve a list of all user accounts.
 *     tags:
 *       - User Accounts
 *     responses:
 *       200:
 *         description: List of user accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   username:
 *                     type: string
 *                   is_activated:
 *                     type: boolean
 *                   is_active:
 *                     type: boolean
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                   user_role:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       role_name:
 *                         type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/user_accounts", userAccountController_1.getAllUserAccounts);
/**
 * @openapi
 * /api/user_accounts/{id}:
 *   get:
 *     summary: Get a user account by ID
 *     description: Retrieve a user account by its ID.
 *     tags:
 *       - User Accounts
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user account to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User account details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *                 is_activated:
 *                   type: boolean
 *                 is_active:
 *                   type: boolean
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                 user_role:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     role_name:
 *                       type: string
 *       404:
 *         description: User account not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/user_accounts/:id", userAccountController_1.getUserAccountById);
/**
 * @openapi
 * /api/user_accounts/{id}:
 *   put:
 *     summary: Update a user account
 *     description: Update an existing user account with new details.
 *     tags:
 *       - User Accounts
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user account to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_role_id:
 *                 type: integer
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               is_activated:
 *                 type: boolean
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *                 is_activated:
 *                   type: boolean
 *                 is_active:
 *                   type: boolean
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                 user_role:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     role_name:
 *                       type: string
 *       404:
 *         description: User account not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/user_accounts/:id", userAccountController_1.updateUserAccount);
/**
 * @openapi
 * /api/user_accounts/{id}:
 *   delete:
 *     summary: Delete a user account
 *     description: Delete a user account by its ID.
 *     tags:
 *       - User Accounts
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user account to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User account not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/user_accounts/:id", userAccountController_1.deleteUserAccount);
exports.default = router;
