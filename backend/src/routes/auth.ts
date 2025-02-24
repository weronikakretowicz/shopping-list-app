import { app } from "../app";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

app.get("/auth/verify", (c) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")?.at(1);

  if (!authHeader?.startsWith("Bearer ") || !token) {
    return c.json({ error: "No token provided" }, 401);
  }

  try {
    const result = jwt.verify(token, JWT_SECRET);

    if (!result) {
      return c.json({ error: "Invalid token" }, 401);
    }

    // @ts-ignore
    if (result?.exp > Date.now()) {
      return c.json({ message: "Auth successful" });
    }

    return c.json({ error: "Invalid token" }, 401);
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);

    return c.json({ message: "Auth endpoints available" });
  }
});
