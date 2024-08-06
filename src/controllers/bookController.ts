import { Request, Response } from "express";
import prisma from "../utils/prisma";

const getPaginatedBooks = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const [books, totalCount] = await Promise.all([
    prisma.book.findMany({
      skip,
      take,
      orderBy: { title: "asc" },
    }),
    prisma.book.count(),
  ]);

  return {
    data: books,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
};

export const getAllBookPagination = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    const result = await getPaginatedBooks(page, pageSize);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const {
    title,
    authors,
    isbn,
    publisher,
    publication_year,
    edition,
    genre,
    language,
    number_of_pages,
    cover_image_url,
    shelf_location,
    description,
  } = req.body;
  try {
    const book = await prisma.book.create({
      data: {
        title,
        authors,
        isbn,
        publisher,
        publication_year,
        edition,
        genre,
        language,
        number_of_pages,
        cover_image_url,
        shelf_location,
        description,
      },
    });
    res.status(201).json(book);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookByISBN = async (req: Request, res: Response) => {
  const { isbn } = req.params;
  try {
    const book = await prisma.book.findUnique({ where: { isbn: isbn } });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    authors,
    isbn,
    publisher,
    publication_year,
    edition,
    genre,
    language,
    number_of_pages,
    cover_image_url,
    shelf_location,
    description,
  } = req.body;
  try {
    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        authors,
        isbn,
        publisher,
        publication_year,
        edition,
        genre,
        language,
        number_of_pages,
        cover_image_url,
        shelf_location,
        description,
      },
    });
    res.status(200).json(book);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Book deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
