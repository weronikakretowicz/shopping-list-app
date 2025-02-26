// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import type { Server as HTTPServer } from "http";
// biome-ignore lint/style/useImportType: <explanation>
import { Server, Server as SocketIOServer } from "socket.io";

export const startWebSocketServer = (server: HTTPServer): SocketIOServer => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);

    socket.on("join-list", (listId) => {
      socket.join(listId);
    });

    socket.on("update-list", (list) => {
      io.to(list._id).emit("list-updated", list);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });

  return io;
};
