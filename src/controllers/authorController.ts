import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const createAuthor = async (req: Request, res: Response) => {
  const { firstName, lastName, bio } = req.body;

  try {
    const author = await prisma.author.create({
      data: {
        firstName,
        lastName,
        bio,
      },
    });
    res.status(201).json(author);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await prisma.author.findMany();
    res.status(200).json(authors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const author = await prisma.author.findUnique({
      where: { id: Number(id) },
    });
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
