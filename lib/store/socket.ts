
import { create } from 'zustand';
import { Socket } from 'socket.io-client';
import { socketService } from '../services/socket';

interface SocketStore {
  socket: Socket | null;
  connect: (token: string) => void;
  disconnect: () => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  connect: (token: string) => {
    const socket = socketService.connect(token);
    set({ socket });
  },
  disconnect: () => {
    socketService.disconnect();
    set({ socket: null });
  },
}));