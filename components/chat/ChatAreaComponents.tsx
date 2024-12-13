import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Contact, Message } from "@/lib/types/chat";
import { User } from "@/lib/types/auth";

interface ContactHeaderProps {
  contact: Contact;
  onToggleDetails: () => void;
}

export const ContactHeader: React.FC<ContactHeaderProps> = ({ contact, onToggleDetails }) => {
  return (
    <div className="p-4 border-b flex items-center space-x-3" onClick={onToggleDetails}>
      <div className="relative">
        <Avatar>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {contact.name[0].toUpperCase() + contact.name[1].toUpperCase()}
          </div>
        </Avatar>
        {contact.isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>
      <div>
        <h2 className="font-medium">{contact.name}</h2>
        <p className="text-sm text-gray-500">
          {contact.isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

interface MessageListProps {
  messages: Message[];
  user: User | null;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, user, messagesEndRef }) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4 flex flex-col-reverse min-h-full">
        {[...messages].reverse().map((message, index) => (
          <div
            key={message.id + index}
            className={`flex ${
              message.senderId === user?.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === user?.id
                  ? "bg-customBlue text-customBlack"
                  : "bg-white text-customBlack border"
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
