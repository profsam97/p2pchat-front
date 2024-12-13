import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface MessageInputProps {
    newMessage: string;
    onSendMessage: (e: React.FormEvent) => void;
    onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export const MessageInput: React.FC<MessageInputProps> = ({
    newMessage,
    onSendMessage,
    onMessageChange,
  }) => {
    return (
      <form onSubmit={onSendMessage} className="p-4 border-t" style={{ maxHeight: 300 }}>
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={onMessageChange}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" className="sendButton bg-white hover:bg-white">
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m12.8151 12.197-7.53202 1.256c-.08659.0145-.16786.0515-.23562.1073-.06775.0558-.11962.1285-.15038.2107l-2.597 6.957c-.248.64.421 1.25 1.035.943l18.00002-9c.1247-.0622.2295-.158.3028-.2765s.1121-.2551.1121-.3945c0-.1393-.0388-.2759-.1121-.3944-.0733-.1186-.1781-.2143-.3028-.2766l-18.00002-8.99998c-.614-.307-1.283.304-1.035.943l2.598 6.95698c.03061.0824.08242.1553.15019.2113s.1491.0932.23581.1077l7.53202 1.255c.0463.0081.0883.0323.1186.0684.0303.036.0469.0816.0469.1286 0 .0471-.0166.0926-.0469.1287-.0303.036-.0723.0602-.1186.0683z"
                fill="#8babd8"
              />
            </svg>
          </Button>
        </div>
      </form>
    );
  };