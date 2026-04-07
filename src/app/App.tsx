import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { StudyStats } from "./components/StudyStats";
import { QuickActions } from "./components/QuickActions";
import { ScrollArea } from "./components/ui/scroll-area";
import { generateStudyResponse } from "./utils/studyResponses";
import { GraduationCap, Sparkles, Clock, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your Study Planner AI assistant. I'm here to help you with your learning journey. Ask me anything about programming, study techniques, or any academic topic!",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(5); // in minutes
  const [tempTimerInput, setTempTimerInput] = useState("5");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  // Timer countdown
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTimerActive]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateStudyResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Start the timer when AI responds
      if (!isTimerActive) {
        setIsTimerActive(true);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleTimerStart = () => {
    if (!isTimerActive) {
      setIsTimerActive(true);
    }
  };

  const handleTimerPause = () => {
    if (isTimerActive) {
      setIsTimerActive(false);
    }
  };

  const handleTimerReset = () => {
    setTimeLeft(timerDuration * 60);
    setIsTimerActive(false);
  };

  const handleTimerDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTimerInput(e.target.value);
  };

  const handleTimerDurationSubmit = () => {
    const newDuration = parseInt(tempTimerInput, 10);
    if (!isNaN(newDuration) && newDuration >= 1 && newDuration <= 45) {
      setTimerDuration(newDuration);
      setTimeLeft(newDuration * 60);
      setIsTimerActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <Card className="h-[600px] flex flex-col shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-500">
            <CardTitle className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5" />
                EDU-GUIDE
              </div>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white hover:bg-white/20 h-8 px-2"
                    >
                      <Clock className="size-4 mr-1" />
                      Set Timer
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Study Timer</h4>
                      <div className="space-y-2">
                        <label className="text-xs text-gray-600">Duration (1-45 minutes)</label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            min="1"
                            max="45"
                            value={tempTimerInput}
                            onChange={handleTimerDurationChange}
                            className="h-8"
                          />
                          <Button 
                            size="sm" 
                            onClick={handleTimerDurationSubmit}
                            className="h-8"
                          >
                            Set
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={handleTimerStart}
                          disabled={isTimerActive}
                          className="flex-1"
                        >
                          <Play className="size-3 mr-1" />
                          Start
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={handleTimerPause}
                          disabled={!isTimerActive}
                          className="flex-1"
                        >
                          <Pause className="size-3 mr-1" />
                          Pause
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={handleTimerReset}
                          className="flex-1"
                        >
                          <RotateCcw className="size-3 mr-1" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <div className="flex items-center gap-2 text-sm font-mono bg-white/20 px-3 py-1 rounded-lg">
                  <span>⏱️</span>
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.text}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="size-8 rounded-full bg-purple-500 flex items-center justify-center">
                      <Sparkles className="size-4 text-white animate-pulse" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex gap-1">
                        <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t bg-white">
              <ChatInput onSend={handleSendMessage} disabled={isTyping} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}