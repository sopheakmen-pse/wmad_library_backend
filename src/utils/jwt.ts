import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface DecodedToken {
  userId: string;
}

interface TokenPayload {
  userId: number;
}

export const generateToken = (userId: number): string => {
  const payload: TokenPayload = { userId };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): DecodedToken => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
