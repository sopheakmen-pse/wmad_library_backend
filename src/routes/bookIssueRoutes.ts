import { Router } from "express";
import {
  createBookIssue,
  getAllBookIssues,
  getBookIssueById,
  updateBookIssue,
  deleteBookIssue,
} from "../controllers/bookIssueController";

const router = Router();

/**
 * @openapi
 * /api/book_issues:
 *   post:
 *     summary: Create a new book issue
 *     tags:
 *       - Book Issues
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookIssueBody'
 *     responses:
 *       201:
 *         description: Book issue created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookIssueTransaction'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/book_issues", createBookIssue);

/**
 * @openapi
 * /api/book_issues:
 *   get:
 *     summary: Get all book issues
 *     tags:
 *       - Book Issues
 *     responses:
 *       200:
 *         description: List of book issues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookIssue'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/book_issues", getAllBookIssues);

/**
 * @openapi
 * /api/book_issues/{id}:
 *   get:
 *     summary: Get a book issue by ID
 *     tags:
 *       - Book Issues
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book issue details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookIssue'
 *       404:
 *         description: Book issue not found
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
router.get("/book_issues/:id", getBookIssueById);

/**
 * @openapi
 * /api/book_issues/{id}:
 *   put:
 *     summary: Update a book issue
 *     tags:
 *       - Book Issues
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookIssueBody'
 *     responses:
 *       200:
 *         description: Book issue updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookIssueTransaction'
 *       404:
 *         description: Book issue not found
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
router.put("/book_issues/:id", updateBookIssue);

/**
 * @openapi
 * /api/book_issues/{id}:
 *   delete:
 *     summary: Delete a book issue
 *     tags:
 *       - Book Issues
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book issue deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book issue deleted
 *       404:
 *         description: Book issue not found
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
router.delete("/book_issues/:id", deleteBookIssue);

export default router;
