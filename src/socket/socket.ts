import { io } from "socket.io-client";

export const socket = io("http://localhost:3001", {
  transports: ["websocket"], // chỉ dùng WebSocket (ổn định hơn)
  autoConnect: true,
  withCredentials: true,
});
