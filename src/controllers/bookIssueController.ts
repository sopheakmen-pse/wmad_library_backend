import { Request, Response } from "express";
import {
  CreateBookIssueBody,
  UpdateBookIssueBody,
  BookIssueParams,
} from "../types/bookIssueTypes";
import prisma from "../utils/prisma";

export const createBookIssue = async (
  req: Request<{}, {}, CreateBookIssueBody>,
  res: Response
) => {
  const {
    transaction_code,
    member_id,
    book_id,
    issue_date,
    due_date,
    return_date,
    status_id,
    processed_by_id,
  } = req.body;
  try {
    const bookIssue = await prisma.book_issue.create({
      data: {
        transaction_code,
        member_id,
        book_id,
        issue_date,
        due_date,
        return_date,
        status_id,
        processed_by_id,
      },
    });
    res.status(201).json(bookIssue);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBookIssues = async (req: Request, res: Response) => {
  try {
    const bookIssues = await prisma.book_issue.findMany({
      include: {
        book: true,
        member: true,
        processed_by: true,
        status: true,
      },
    });
    res.status(200).json(bookIssues);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookIssueById = async (
  req: Request<BookIssueParams>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const bookIssue = await prisma.book_issue.findUnique({
      where: { id: Number(id) },
      include: {
        book: true,
        member: true,
        processed_by: true,
        status: true,
      },
    });
    if (bookIssue) {
      res.status(200).json(bookIssue);
    } else {
      res.status(404).json({ error: "Book issue not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBookIssue = async (
  req: Request<BookIssueParams, {}, UpdateBookIssueBody>,
  res: Response
) => {
  const { id } = req.params;
  const {
    transaction_code,
    member_id,
    book_id,
    issue_date,
    due_date,
    return_date,
    status_id,
    processed_by_id,
  } = req.body;
  try {
    const bookIssue = await prisma.book_issue.update({
      where: { id: Number(id) },
      data: {
        transaction_code,
        member_id,
        book_id,
        issue_date,
        due_date,
        return_date,
        status_id,
        processed_by_id,
      },
    });
    res.status(200).json(bookIssue);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBookIssue = async (
  req: Request<BookIssueParams>,
  res: Response
) => {
  const { id } = req.params;
  try {
    await prisma.book_issue.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Book issue deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
