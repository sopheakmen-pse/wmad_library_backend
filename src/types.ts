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
