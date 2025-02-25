import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/shopping";
export const JWT_SECRET = process.env.JWT_SECRET || "fallbackSecret";
