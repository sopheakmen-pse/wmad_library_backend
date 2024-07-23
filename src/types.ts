import { parse, isValid } from "date-fns";

export interface MemberData {
  fullname: string;
  date_of_birth: Date;
  address: string;
  phone_number: string;
  email: string;
  start_date: Date;
  expiry_date: Date;
  is_active: boolean;
}

export interface CreateUserAccountBody {
  user_role_id: number;
  email: string;
  username: string;
  password: string;
  is_activated?: boolean;
  is_active?: boolean;
}

export interface UpdateUserAccountBody extends Partial<CreateUserAccountBody> {}

export interface UserAccountParams {
  id: string;
}

export interface ErrorResponse {
  message: string;
}

export class CustomError extends Error {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const parseDate = (dateStr: string): Date | undefined => {
  const parsedDate = parse(dateStr, "yyyy-MM-dd", new Date());
  return isValid(parsedDate) ? parsedDate : undefined;
};

export const isValidMemberData = (data: any): data is MemberData => {
  return (
    typeof data.fullname === "string" &&
    data.date_of_birth !== undefined &&
    typeof data.address === "string" &&
    typeof data.phone_number === "string" &&
    typeof data.email === "string" &&
    data.start_date !== undefined &&
    data.expiry_date !== undefined &&
    typeof data.is_active === "boolean"
  );
};
