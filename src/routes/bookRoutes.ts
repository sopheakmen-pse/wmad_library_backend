import { Router } from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController';

const router = Router();

/**
 * @openapi
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     description: Create a new book with the specified details.
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               authors:
 *                 type: string
 *               isbn:
 *                 type: string
 *               publisher:
 *                 type: string
 *               publication_year:
 *                 type: integer
 *               edition:
 *                 type: string
 *               genre:
 *                 type: string
 *               language:
 *                 type: string
 *               number_of_pages:
 *                 type: integer
 *               cover_image_url:
 *                 type: string
 *               shelf_location:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Bad request
 */
router.post('/books', createBook);

/**
 * @openapi
 * /api/books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of all books.
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: List of books
 *       400:
 *         description: Bad request
 */
router.get('/books', getAllBooks);

/**
 * @openapi
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Retrieve a book by its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 *       400:
 *         description: Bad request
 */
router.get('/books/:id', getBookById);

/**
 * @openapi
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     description: Update an existing book with new details.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book to update
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
 *               title:
 *                 type: string
 *               authors:
 *                 type: string
 *               isbn:
 *                 type: string
 *               publisher:
 *                 type: string
 *               publication_year:
 *                 type: integer
 *               edition:
 *                 type: string
 *               genre:
 *                 type: string
 *               language:
 *                 type: string
 *               number_of_pages:
 *                 type: integer
 *               cover_image_url:
 *                 type: string
 *               shelf_location:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 *       400:
 *         description: Bad request
 */
router.put('/books/:id', updateBook);

/**
 * @openapi
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Delete a book by its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       400:
 *         description: Bad request
 */
router.delete('/books/:id', deleteBook);

export default router;
