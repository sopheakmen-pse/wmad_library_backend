import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { username, email, password, userRoleId } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user_account.create({
      data: {
        username,
        email,
        password: hashedPassword,
        user_role_id: userRoleId,
      },
    });

    const token = generateToken(user.id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user_account.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user.id);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
