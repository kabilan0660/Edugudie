import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { API_BASE } from "../config";
import { ScrollArea } from "./components/ui/scroll-area";
import { generateStudyResponse } from "./utils/studyResponses";
import { Sparkles, Clock } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import AuthPage from "./components/AuthPage";
import { Toaster, toast } from "sonner";
import { Sidebar } from "./components/Sidebar";
import { SyllabusManager } from "./components/SyllabusManager";
import { Topic } from "./utils/studyResponses";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface Syllabus {
  _id: string;
  title: string;
  topics: Topic[];
  updatedAt: string;
}

interface Conversation {
  _id: string;
  title: string;
  messages: Message[];
  updatedAt: string;
}

const DEFAULT_WELCOME_MESSAGE: Message = {
  id: "welcome",
  text: "Hello! I'm your Study Planner AI assistant. I'm here to help you with your learning journey. Ask me anything about programming, study techniques, or any academic topic!",
  isUser: false,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};



export default function App() {
  const [messages, setMessages] = useState<Message[]>([DEFAULT_WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); 
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(5); 
  const [tempTimerInput, setTempTimerInput] = useState("5");
  const [view, setView] = useState<"dashboard" | "auth">("auth");
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  
  // Use a REF for activeConversationId to prevent stale closures in handleSendMessage
  const activeConversationIdRef = useRef<string | null>(null);
  // We also keep a state version to trigger re-renders for the sidebar highlight
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  
  // Syllabus Specific State
  const [syllabi, setSyllabi] = useState<Syllabus[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [activeSyllabusId, setActiveSyllabusId] = useState<string | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Update ref whenever state changes
  useEffect(() => {
    activeConversationIdRef.current = activeConversationId;
  }, [activeConversationId]);

  // Persistent Session Restoration
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        isInitialMount.current = false;
        return;
      }
      
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { "x-auth-token": token }
        });
        if (res.ok) {
          const userData = await res.json();
          setUser({
            id: userData._id,
            name: userData.name,
            email: userData.email
          });
          toast.success(`Welcome back, ${userData.name}!`);
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Session restoration failed:", err);
      } finally {
        isInitialMount.current = false;
      }
    };

    if (isInitialMount.current) {
      restoreSession();
    }
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollAreaRef.current) {
      // Look for either the standard Radix viewport or our custom data-slot
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport], [data-slot="scroll-area-viewport"]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  // Timer logic
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isTimerActive]);

  // Fetch Conversations
  const fetchConversations = useCallback(async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/conversations`, {
        headers: { "x-auth-token": token || "" }
      });
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  // Fetch Syllabi
  const fetchSyllabi = useCallback(async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/syllabi`, {
        headers: { "x-auth-token": token || "" }
      });
      if (res.ok) {
        const data = await res.json();
        setSyllabi(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchConversations();
      fetchSyllabi();
    }
  }, [user, fetchConversations, fetchSyllabi]);

  // Save/Update logic
  const saveConversation = async (currentMessages: Message[], conversationId: string | null) => {
    if (!user) return null;
    const token = localStorage.getItem("token");
    try {
      const firstUserMsg = currentMessages.find(m => m.isUser)?.text.substring(0, 30) || "New Chat";
      const title = firstUserMsg + (firstUserMsg.length >= 30 ? "..." : "");

      const res = await fetch(`${API_BASE}/api/conversations`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-auth-token": token || ""
        },
        body: JSON.stringify({ 
          id: conversationId, 
          messages: currentMessages,
          title: title
        })
      });
      if (res.ok) {
        const data = await res.json();
        fetchConversations();
        return data._id;
      }
    } catch (err) {
      console.error("Failed to save conversation:", err);
    }
    return conversationId;
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update local UI immediately
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setIsTyping(true);

    try {
      const token = localStorage.getItem("token");

      // Build history excluding the welcome message and the current user message
      const history = currentMessages.slice(0, -1).filter(m => m.id !== 'welcome');

      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
        },
        body: JSON.stringify({ message: text, history }),
      });

      let replyText = "I'm sorry, I encountered an error. Please try again.";
      if (res.ok) {
        const data = await res.json();
        replyText = data.reply;
      } else {
        const err = await res.json().catch(() => ({}));
        replyText = err.message || replyText;
        toast.error("AI service error: " + replyText);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      let finalMessages: Message[] = [];
      setMessages(prev => {
        finalMessages = [...prev, aiMessage];
        return finalMessages;
      });

      if (user) {
        const currentId = activeConversationIdRef.current;
        const savedId = await saveConversation(finalMessages, currentId);
        if (savedId && savedId !== currentId) {
          setActiveConversationId(savedId);
        }
      }

      if (!isTimerActive) setIsTimerActive(true);
    } catch (err) {
      console.error("Chat error:", err);
      toast.error("Failed to reach AI. Is the backend running?");
    } finally {
      setIsTyping(false);
    }
  };

  const handleTopicSelect = async (topic: Topic) => {
    setActiveTopic(topic);
    // Automatically start timer for the topic duration
    setTimerDuration(topic.duration);
    setTimeLeft(topic.duration * 60);
    setIsTimerActive(true);
    
    // Add a system message for the topic
    const topicMessage: Message = {
      id: `topic-${topic.id}`,
      text: `Starting session: **${topic.title}**`,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, topicMessage]);
    toast.info(`Timer started for ${topic.duration} minutes`);

    // Automatically request detailed learning notes for this topic from Gemini
    setIsTyping(true);
    try {
      const token = localStorage.getItem("token");
      const prompt = `Please generate comprehensive, detailed study notes and explanations for the topic: "${topic.title}". 
Include key concepts, definitions, clear explanations, and practical examples (or code blocks if relevant) to help me learn it. Use clear markdown formatting with headers.`;
      
      const history = [...messages.filter(m => m.id !== 'welcome'), topicMessage];

      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
        },
        body: JSON.stringify({ 
          message: prompt, 
          history 
        }),
      });

      let replyText = "Failed to generate detailed study notes automatically. Feel free to ask me questions about this topic here!";
      if (res.ok) {
        const data = await res.json();
        replyText = data.reply;
      } else {
        const err = await res.json().catch(() => ({}));
        replyText = err.message || replyText;
      }

      const aiMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: replyText,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => {
        const finalMessages = [...prev, aiMessage];
        if (user) {
          saveConversation(finalMessages, activeConversationIdRef.current).then(savedId => {
            if (savedId && savedId !== activeConversationIdRef.current) {
              setActiveConversationId(savedId);
            }
          });
        }
        return finalMessages;
      });
    } catch (err) {
      console.error("Failed to automatically generate topic notes:", err);
      toast.error("Failed to fetch study notes from AI.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleTopicsGenerated = async (newTopics: Topic[], title: string) => {
    setTopics(newTopics);
    if (user) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/syllabi`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "x-auth-token": token || "" 
          },
          body: JSON.stringify({ 
            title: title || "Study Plan",
            topics: newTopics 
          })
        });
        if (res.ok) {
          const data = await res.json();
          fetchSyllabi();
          setActiveSyllabusId(data._id);
          toast.success(`Syllabus "${title}" saved to your library`);
        }
      } catch (err) {
        console.error("Failed to save syllabus:", err);
      }
    }
  };

  const handleSelectConversation = async (id: string) => {
    const token = localStorage.getItem("token");
    setIsTyping(true);
    try {
      const res = await fetch(`${API_BASE}/api/conversations/${id}`, {
        headers: { "x-auth-token": token || "" }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
        setActiveConversationId(id);
      }
    } catch (err) {
      toast.error("Failed to load conversation");
    } finally {
      setIsTyping(false);
    }
  };

  const handleDeleteConversation = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/api/conversations/${id}`, {
        method: "DELETE",
        headers: { "x-auth-token": token || "" }
      });
      if (res.ok) {
        if (activeConversationIdRef.current === id) {
          handleNewChat();
        }
        fetchConversations();
        toast.success("Conversation deleted");
      }
    } catch (err) {
      toast.error("Failed to delete conversation");
    }
  };

  const handleNewChat = () => {
    setMessages([DEFAULT_WELCOME_MESSAGE]);
    setActiveConversationId(null);
    setTopics([]);
    setActiveTopic(null);
    setActiveSyllabusId(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (view === "auth") {
    return (
      <>
        <AuthPage 
          onLoginSuccess={(data) => {
            setUser(data);
            setView("dashboard");
          }} 
        />
        <Toaster position="top-center" />
      </>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Toaster position="top-center" />
      
      {user && (
        <Sidebar 
          syllabi={syllabi}
          conversations={conversations}
          activeId={activeConversationId}
          activeTopicId={activeTopic?.id}
          onSelectConversation={handleSelectConversation}
          onSelectTopic={(topic: Topic, syllabusId: string) => {
            setActiveSyllabusId(syllabusId);
            // Also need to set the general topics list to the syllabus topics 
            // so the main view stays consistent
            const syllabus = syllabi.find(s => s._id === syllabusId);
            if (syllabus) setTopics(syllabus.topics);
            handleTopicSelect(topic);
          }}
          onDeleteConversation={handleDeleteConversation}
          onDeleteSyllabus={async (id: string) => {
            const token = localStorage.getItem("token");
            try {
              const res = await fetch(`${API_BASE}/api/syllabi/${id}`, {
                method: "DELETE",
                headers: { "x-auth-token": token || "" }
              });
              if (res.ok) {
                fetchSyllabi();
                toast.success("Folder deleted");
                if (activeSyllabusId === id) {
                  setTopics([]);
                  setActiveTopic(null);
                }
              }
            } catch (err) {
              toast.error("Failed to delete folder");
            }
          }}
          onNewChat={handleNewChat}
          user={user}
          onLogout={() => {
            setUser(null);
            localStorage.removeItem("token");
            handleNewChat();
            setView("auth");
          }}
        />
      )}

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-slate-800 tracking-tight">
            <Sparkles className="size-5 text-purple-600" />
            <span>EDU-GUIDE</span>
          </div>

          <div className="flex items-center gap-4">
            {!user && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setView("auth")}
                className="rounded-full"
              >
                Login / Register
              </Button>
            )}

            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Clock className="size-4 mr-1 text-slate-500" />
                    <span className="hidden sm:inline">Set Timer</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-3 p-1">
                    <h4 className="font-medium text-sm">Study Timer</h4>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        min="1"
                        max="45"
                        value={tempTimerInput}
                        onChange={(e) => setTempTimerInput(e.target.value)}
                        className="h-8"
                      />
                      <Button size="sm" className="h-8" onClick={() => {
                        const dur = parseInt(tempTimerInput);
                        if (!isNaN(dur)) {
                          setTimerDuration(dur);
                          setTimeLeft(dur * 60);
                        }
                      }}>Set</Button>
                    </div>
                    <div className="flex gap-1 pt-1">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => setIsTimerActive(true)}>Start</Button>
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => setIsTimerActive(false)}>Pause</Button>
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => {
                        setTimeLeft(timerDuration * 60);
                        setIsTimerActive(false);
                      }}>Reset</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <div className="flex items-center gap-2 text-sm font-mono bg-slate-100 px-3 py-1 rounded-lg border">
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden p-0 md:p-6 bg-slate-50 flex items-center justify-center">
            <Card className="w-full max-w-4xl h-full flex flex-col shadow-xl border-none overflow-hidden bg-white gap-0 relative">
                {activeTopic && isTimerActive && (
                  <div className="absolute top-6 right-6 size-16 rounded-full bg-slate-900 border-4 border-white shadow-xl flex items-center justify-center z-20 animate-in fade-in zoom-in">
                    <span className="text-white font-mono font-bold text-sm tracking-tighter">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                )}
                <ScrollArea className="flex-1 min-h-0" ref={scrollAreaRef}>
                  <div className="p-4 md:p-8 space-y-6 max-w-3xl mx-auto">
                    {/* Only show SyllabusManager if we are in the initial state or have topics but no active topic */}
                    {(!activeTopic || messages.length <= 1) && (
                      <SyllabusManager 
                        topics={topics}
                        activeTopicId={activeTopic?.id}
                        onTopicsGenerated={handleTopicsGenerated}
                        onTopicSelect={handleTopicSelect}
                      />
                    )}

                    {activeTopic && messages.filter(m => m.id !== 'welcome').length > 0 && messages.map((message) => (
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
                        <div className="bg-slate-50 border rounded-2xl px-4 py-3 shadow-sm">
                          <span className="flex gap-1 items-center h-4">
                            <span className="size-1.5 bg-slate-300 rounded-full animate-bounce" />
                            <span className="size-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:200ms]" />
                            <span className="size-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:400ms]" />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                <div className="p-4 md:p-6 bg-white border-t">
                  <div className="max-w-3xl mx-auto">
                    <ChatInput onSend={handleSendMessage} disabled={isTyping} />
                    <p className="text-[10px] text-center text-slate-400 mt-3 font-medium uppercase tracking-wider">
                      Edu-Guide AI Study Planner • Your constant learning companion
                    </p>
                  </div>
                </div>
            </Card>
        </div>
      </main>
    </div>
  );
}