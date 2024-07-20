import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import swaggerDocs from "./swagger";

const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
swaggerDocs(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
