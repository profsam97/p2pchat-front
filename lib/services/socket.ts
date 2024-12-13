
import { io, Socket } from 'socket.io-client';
import { baseUrl } from '@/base/baseUrl';

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(token: string): Socket {
    if (!this.socket) {
      this.socket = io(baseUrl, {
        auth: {
          token
        }
      });

      // Handle connection events
      this.socket.on('connect', () => {
        console.log('Connected to socket server');
        this.socket?.emit('authenticate', token);
      });

      this.socket.on('auth-error', (error: string) => {
        console.error('Socket authentication error:', error);
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      // Handle offline messages
      this.socket.on('offline-messages', (messages: any[]) => {
        console.log('Received offline messages:', messages);
      });
    }

    return this.socket;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketService = SocketService.getInstance();