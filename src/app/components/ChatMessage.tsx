import { Avatar, AvatarFallback } from "./ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <Avatar className="size-8">
        <AvatarFallback className={isUser ? "bg-blue-500" : "bg-purple-500"}>
          {isUser ? <User className="size-4 text-white" /> : <Bot className="size-4 text-white" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[70%]`}>
        <div
          className={`rounded-lg px-4 py-2 break-words ${
            isUser
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ 
            __html: message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
          }} />
        </div>
        <span className="text-xs text-gray-500 mt-1">{timestamp}</span>
      </div>
    </div>
  );
}