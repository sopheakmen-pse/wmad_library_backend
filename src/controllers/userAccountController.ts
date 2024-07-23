import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";

import {
  CreateUserAccountBody,
  UpdateUserAccountBody,
  UserAccountParams,
  CustomError,
  ErrorResponse,
} from "../types";

export const createUserAccount = async (
  req: Request<{}, {}, CreateUserAccountBody>,
  res: Response
) => {
  const {
    user_role_id,
    email,
    username,
    password,
    is_activated = false,
    is_active = true,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userAccount = await prisma.user_account.create({
      data: {
        user_role_id,
        email,
        username,
        password: hashedPassword,
        is_activated,
        is_active,
      },
    });
    res.status(201).json(userAccount);
  } catch (error: any) {
    const errorMessage =
      error instanceof CustomError ? error.message : "Internal Server Error";
    res.status(error.statusCode || 500).json({ error: errorMessage });
  }
};

export const getAllUserAccounts = async (req: Request, res: Response) => {
  try {
    const userAccounts = await prisma.user_account.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        is_activated: true,
        is_active: true,
        created_at: true,
        updated_at: true,
        user_role: {
          select: {
            id: true,
            user_role_name: true,
          },
        },
      },
    });
    res.status(200).json(userAccounts);
  } catch (error: any) {
    const errorMessage =
      error instanceof CustomError ? error.message : "Internal Server Error";
    res.status(error.statusCode || 500).json({ error: errorMessage });
  }
};

export const getUserAccountById = async (
  req: Request<UserAccountParams>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const userAccount = await prisma.user_account.findUnique({
      select: {
        id: true,
        email: true,
        username: true,
        is_activated: true,
        is_active: true,
        created_at: true,
        updated_at: true,
        user_role: {
          select: {
            id: true,
            user_role_name: true,
          },
        },
      },
      where: { id: Number(id) },
    });
    if (userAccount) {
      res.status(200).json(userAccount);
    } else {
      res.status(404).json({ error: "User account not found" });
    }
  } catch (error: any) {
    const errorMessage =
      error instanceof CustomError ? error.message : "Internal Server Error";
    res.status(error.statusCode || 500).json({ error: errorMessage });
  }
};

export const updateUserAccount = async (
  req: Request<UserAccountParams, {}, UpdateUserAccountBody>,
  res: Response
) => {
  const { id } = req.params;
  const { user_role_id, email, username, password, is_activated, is_active } =
    req.body;
  try {
    const userAccount = await prisma.user_account.update({
      select: {
        id: true,
        email: true,
        username: true,
        is_activated: true,
        is_active: true,
        created_at: true,
        updated_at: true,
        user_role: {
          select: {
            id: true,
            user_role_name: true,
          },
        },
      },
      where: { id: Number(id) },
      data: {
        user_role_id,
        email,
        username,
        password,
        is_activated,
        is_active,
      },
    });
    res.status(200).json(userAccount);
  } catch (error: any) {
    const errorMessage =
      error instanceof CustomError ? error.message : "Internal Server Error";
    res.status(error.statusCode || 500).json({ error: errorMessage });
  }
};

export const deleteUserAccount = async (
  req: Request<UserAccountParams>,
  res: Response
) => {
  const { id } = req.params;
  try {
    await prisma.user_account.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "User account deleted" });
  } catch (error: any) {
    const errorMessage =
      error instanceof CustomError ? error.message : "Internal Server Error";
    res.status(error.statusCode || 500).json({ error: errorMessage });
  }
};
