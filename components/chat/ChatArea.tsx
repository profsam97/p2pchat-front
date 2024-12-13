import { Contact, Message } from "@/lib/types/chat";
import { useEffect, useRef } from "react";
import { ContactHeader, MessageList } from "./ChatAreaComponents";
import { User } from "@/lib/types/auth";
import { MessageInput } from "./MessageInput";

interface ChatAreaProps {
    selectedContact: Contact | null;
    messages: Message[];
    newMessage: string;
    user: User  | null;
    contactDetails: boolean;
    onSendMessage: (e: React.FormEvent) => void;
    onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleDetails: () => void;
  }
  
  export const ChatArea: React.FC<ChatAreaProps> = ({
    selectedContact,
    messages,
    newMessage,
    user,
    contactDetails,
    onSendMessage,
    onMessageChange,
    onToggleDetails,
  }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        if (messagesEndRef.current) {
          const viewport = messagesEndRef.current.closest('[data-radix-scroll-area-viewport]');
          if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
          }
        }
      }, 0);
      return () => clearTimeout(timer);
    }, [messages]);
  
    if (!selectedContact) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Select a contact to start chatting</p>
        </div>
      );
    }
  
    return (
      <div className="flex-1 flex flex-col">
        <ContactHeader contact={selectedContact} onToggleDetails={onToggleDetails} />
        <MessageList    messages={messages} user={user} messagesEndRef={messagesEndRef} />
        <MessageInput
          newMessage={newMessage}
          onSendMessage={onSendMessage}
          onMessageChange={onMessageChange}
        />
      </div>
    );
  };
  