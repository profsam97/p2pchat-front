"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth";
import { useSocketStore } from "@/lib/store/socket";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.user?.token);
  const connectSocket = useSocketStore((state) => state.connect);
  const disconnect = useSocketStore((state) => state.disconnect);

  useEffect(() => {
    if (token) {
      connectSocket(token);
    }

    return () => {
      disconnect();
    };
  }, [token, connectSocket, disconnect]);

  return <>{children}</>;
}