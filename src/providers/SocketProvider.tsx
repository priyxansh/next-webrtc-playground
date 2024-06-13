"use client";

import { createContext, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// Create a context for the socket
const SocketContext = createContext<{
  socket: Socket;
} | null>(null);

type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketProvider = ({ children }: SocketProviderProps) => {
  // Get the socket URL from the environment variables
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL as string;

  // Create a socket connection
  const socket = io(socketUrl);

  // Disconnect the socket when the component unmounts
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};

export default SocketProvider;
