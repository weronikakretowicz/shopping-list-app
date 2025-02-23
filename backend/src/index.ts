import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { connectDB } from "./db";
import { cors } from "hono/cors";
import { startWebSocketServer } from "./websockets";
import { createServer } from "http";
import { PORT } from "./config";
import { app } from "./app";

connectDB();

app.use("*", cors());
app.use("*", async (c, next) => {
  c.res.headers.set("Content-Type", "application/json");
  await next();
});

// Tworzenie serwera HTTP dla WebSocketów
const server = createServer();
startWebSocketServer(server);

app.get("/status", (c) => {
  return c.text("Working...");
});

app.get("/test", (c) => c.text("Hono!!"));

// Uruchomienie serwera HTTP z API Hono
serve({
  fetch: app.fetch,
  port: Number(PORT),
});

// server.listen(3002, () => {
//     console.log('📡 WebSocket server running on port 3002');
// });

console.log(`🚀 Server is running on http://localhost:${PORT}`);
