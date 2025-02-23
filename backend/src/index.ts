import { serve } from "@hono/node-server";
import { connectDB } from "./db";
import { startWebSocketServer } from "./websockets";
import { createServer } from "http";
import { PORT } from "./config";
import { app } from "./app";

connectDB();

import "./routes";

// Tworzenie serwera HTTP dla WebSocketów
const server = createServer();
startWebSocketServer(server);

app.get("/status", (c) => c.text("Working..."));

// Uruchomienie serwera HTTP z API Hono
serve({
  fetch: app.fetch,
  port: Number(PORT),
});

// server.listen(3002, () => {
//     console.log('📡 WebSocket server running on port 3002');
// });

console.log(`🚀 Server is running on http://localhost:${PORT}`);
