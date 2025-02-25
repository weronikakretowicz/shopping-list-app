import { Context } from "hono";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import type { MyEnv } from "../types";

export const authMiddleware = async (c: Context<{ Bindings: MyEnv }>, next: () => Promise<void>) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "No token provided" }, 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    c.env.userId = decoded.userId; // ustawiamy userId w env
    await next();
  } catch (err) {
    return c.json({ error: "Invalid token" }, 401);
  }
};
