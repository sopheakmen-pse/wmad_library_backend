import { Request, Response } from "express";
import {
  CreateBookIssueBody,
  UpdateBookIssueBody,
  BookIssueParams,
} from "../types/bookIssueTypes";
import ShortUniqueId from "short-unique-id";
import prisma from "../utils/prisma";
import moment from "moment";

export const createBookIssue = async (
  req: Request<{}, {}, CreateBookIssueBody>,
  res: Response
) => {
  const {
    member_id,
    book_id,
    issue_date,
    due_date,
    return_date,
    status_id,
    processed_by_id,
  } = req.body;

  const issueDate = moment(issue_date, "YYYY-MM-DD").toDate();
  const dueDate = moment(due_date, "YYYY-MM-DD").toDate();
  const returnDate = return_date
    ? moment(return_date, "YYYY-MM-DD").toDate()
    : null;

  try {
    const uid = new ShortUniqueId({ length: 6 });
    const bookIssue = await prisma.book_issue.create({
      data: {
        transaction_code: uid().toString().toUpperCase(),
        member_id,
        book_id,
        issue_date: issueDate,
        due_date: dueDate,
        return_date: returnDate,
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
        processed_by: {
          include: {
            user_role: true,
          },
        },
        status: true,
      },
    });
    const simplifiedBookIssueds = bookIssues.map((item) => {
      const { book, member, processed_by, status } = item;
      return {
        ...item,
        book: {
          id: book.id,
          isbn: book.isbn,
          title: book.title,
        },
        member: {
          id: member.id,
          member_code: member.member_code,
          fullname: member.fullname,
          is_active: member.is_active,
        },
        processed_by: {
          id: processed_by.id,
          username: processed_by.username,
          email: processed_by.email,
          user_role_name: processed_by.user_role.user_role_name,
        },
        status: {
          id: status.id,
          name: status.status,
        },
      };
    });

    res.status(200).json(simplifiedBookIssueds);
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
        processed_by: {
          include: {
            user_role: true,
          },
        },
        status: true,
      },
    });
    if (bookIssue) {
      const { book, member, processed_by, status } = bookIssue;
      res.status(200).json({
        ...bookIssue,
        book: {
          id: book.id,
          isbn: book.isbn,
          title: book.title,
        },
        member: {
          id: member.id,
          member_code: member.member_code,
          fullname: member.fullname,
          is_active: member.is_active,
        },
        processed_by: {
          id: processed_by.id,
          username: processed_by.username,
          email: processed_by.email,
          user_role_name: processed_by.user_role.user_role_name,
        },
        status: {
          id: status.id,
          name: status.status,
        },
      });
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
