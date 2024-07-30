import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { isValidMemberData } from "../types";
import ShortUniqueId from "short-unique-id";

// Create a new member
export const createMember = async (req: Request, res: Response) => {
  const {
    fullname,
    date_of_birth,
    address,
    phone_number,
    email,
    start_date,
    expiry_date,
    is_active,
  } = req.body;

  const parsedDateOfBirth = new Date(date_of_birth);
  const parsedStartDate = new Date(start_date);
  const parsedExpiryDate = new Date(expiry_date);

  if (
    !isValidMemberData({
      fullname,
      date_of_birth: parsedDateOfBirth,
      address,
      phone_number,
      email,
      start_date: parsedStartDate,
      expiry_date: parsedExpiryDate,
      is_active,
    })
  ) {
    return res.status(400).json({ error: "Invalid member data" });
  }

  try {
    const uid = new ShortUniqueId({ length: 6 });
    const member = await prisma.member.create({
      data: {
        member_code: uid().toString().toUpperCase(),
        fullname,
        date_of_birth: parsedDateOfBirth!,
        address,
        phone_number,
        email,
        start_date: parsedStartDate!,
        expiry_date: parsedExpiryDate!,
        is_active,
      },
    });
    res.status(201).json(member);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all members
export const getMembers = async (req: Request, res: Response) => {
  try {
    const members = await prisma.member.findMany();
    res.status(200).json(members);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single member by ID
export const getMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const member = await prisma.member.findUnique({
      where: { id: Number(id) },
    });
    if (member) {
      res.status(200).json(member);
    } else {
      res.status(404).json({ error: "Member not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a member
export const updateMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      fullname,
      date_of_birth,
      address,
      phone_number,
      email,
      start_date,
      expiry_date,
      is_active,
    } = req.body;

    const parsedDateOfBirth = new Date(date_of_birth);
    const parsedStartDate = new Date(start_date);
    const parsedExpiryDate = new Date(expiry_date);

    if (
      !isValidMemberData({
        fullname,
        date_of_birth: parsedDateOfBirth,
        address,
        phone_number,
        email,
        start_date: parsedStartDate,
        expiry_date: parsedExpiryDate,
        is_active,
      })
    ) {
      return res.status(400).json({ error: "Invalid member data" });
    }
    const updatedMember = await prisma.member.update({
      where: { id: Number(id) },
      data: {
        fullname,
        date_of_birth: parsedDateOfBirth!,
        address,
        phone_number,
        email,
        start_date: parsedStartDate!,
        expiry_date: parsedExpiryDate!,
        is_active,
      },
    });
    res.status(200).json(updatedMember);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a member
export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.member.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
