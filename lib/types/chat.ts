
 export interface Contact {
  id: string;
  email: string;
  lastMessage?: string;
  timestamp?: string;
  isOnline: boolean;
  name: string; 
  mobile: string;
  unreadCount?: number
}
export interface User {
  id: string;
  email: string;
  mobile: string;
  isOnline: boolean;
  name: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  createdAt: string;
}