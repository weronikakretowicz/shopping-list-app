import { Hono } from "hono";
import { MyEnv } from "./types";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: MyEnv }>();

app.use(
  "*",
  cors({
    origin: "*", // Allow only this origin
    allowMethods: ["GET", "POST", "PUT", "DELETE"], // Restrict HTTP methods
    allowHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    credentials: true, // Allow sending credentials (cookies, authentication headers)
  }),
);

app.use("*", async (c, next) => {
  c.res.headers.set("Content-Type", "application/json");
  await next();
});

export { app };
