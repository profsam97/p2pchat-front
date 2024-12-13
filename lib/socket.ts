import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initializeSocket = (userId: string, email: string, phone: string) => {
  socket = io("http://localhost:3001");
  
  socket.on("connect", () => {
    console.log("Connected to socket server");
    socket.emit("register", { userId, email, phone });
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initializeSocket first.");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};