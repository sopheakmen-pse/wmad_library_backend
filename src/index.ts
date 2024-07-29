import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import memberRoutes from "./routes/memberRoutes";
import userAccountRoutes from "./routes/userAccountRoutes";
import bookRoutes from "./routes/bookRoutes";
import bookIssueRoutes from "./routes/bookIssueRoutes";
import swaggerDocs from "./swagger";
import { authMiddleware } from "./middlewares/authMiddleware";

if (process.env.NODE_ENV === "production") {
  dotenv.config();
} else {
  const envFile = `.env.${process.env.NODE_ENV}`;
  dotenv.config({ path: envFile });
}

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/api", memberRoutes);
app.use("/api", authMiddleware, userAccountRoutes);
app.use("/api", authMiddleware, bookRoutes);
app.use("/api", authMiddleware, bookIssueRoutes);
swaggerDocs(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
