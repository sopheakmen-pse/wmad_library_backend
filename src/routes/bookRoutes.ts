import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBookByISBN,
  getAllBookPagination,
} from "../controllers/bookController";

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
router.post("/books", createBook);

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
router.get("/books", getAllBooks);

/**
 * @openapi
 * /api/books/pagination:
 *   get:
 *       summary: Get paginated list of books
 *       description: Retrieve a paginated list of books with pagination information.
 *       tags:
 *          - Books
 *       parameters:
 *         - name: page
 *           in: query
 *           required: false
 *           schema:
 *             type: integer
 *             example: 1
 *         - name: pageSize
 *           in: query
 *           required: false
 *           schema:
 *             type: integer
 *             example: 10
 *       responses:
 *         '200':
 *           description: Successful response with paginated book data
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         title:
 *                           type: string
 *                           example: "The Great Gatsby"
 *                         authors:
 *                           type: string
 *                           example: "F. Scott Fitzgerald"
 *                         isbn:
 *                           type: string
 *                           example: "9780743273565"
 *                         publisher:
 *                           type: string
 *                           example: "Scribner"
 *                         publication_year:
 *                           type: integer
 *                           example: 1925
 *                         edition:
 *                           type: string
 *                           example: "First"
 *                         genre:
 *                           type: string
 *                           example: "Fiction"
 *                         language:
 *                           type: string
 *                           example: "English"
 *                         number_of_pages:
 *                           type: integer
 *                           example: 180
 *                         cover_image_url:
 *                           type: string
 *                           nullable: true
 *                           example: "http://example.com/cover.jpg"
 *                         shelf_location:
 *                           type: string
 *                           example: "Shelf A3"
 *                         description:
 *                           type: string
 *                           example: "A classic novel of the Jazz Age."
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-08-06T03:18:12.739Z"
 *                         updated_at:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-08-06T03:18:12.739Z"
 *                   pagination:
 *                     type: object
 *                     properties:
 *                       page:
 *                         type: integer
 *                         example: 1
 *                       pageSize:
 *                         type: integer
 *                         example: 10
 *                       totalPages:
 *                         type: integer
 *                         example: 5
 *                       totalCount:
 *                         type: integer
 *                         example: 50
 */
router.get("/books/pagination", getAllBookPagination);

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
router.get("/books/:id", getBookById);

/**
 * @openapi
 * /api/books/isbn/{isbn}:
 *   get:
 *     summary: Get a book by isbn
 *     description: Retrieve a book by its isbn.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: isbn
 *         in: path
 *         description: isbn of the book to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 *       400:
 *         description: Bad request
 */
router.get("/books/isbn/:isbn", getBookByISBN);

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
router.put("/books/:id", updateBook);

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
router.delete("/books/:id", deleteBook);

export default router;
