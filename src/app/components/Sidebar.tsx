import { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { 
  PlusCircle, 
  MessageSquare, 
  Trash2, 
  UserCircle, 
  LogOut, 
  Folder, 
  ChevronDown, 
  ChevronRight,
  FileText
} from "lucide-react";
import { cn } from "./ui/utils";

interface SidebarProps {
  syllabi: any[];
  conversations: any[];
  activeId: string | null;
  activeTopicId?: string | null;
  onSelectConversation: (id: string) => void;
  onSelectTopic: (topic: any, syllabusId: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  onDeleteSyllabus: (id: string) => void;
  user: any;
  onLogout: () => void;
}

export function Sidebar({ 
  syllabi = [],
  conversations = [], 
  activeId, 
  activeTopicId,
  onSelectConversation, 
  onSelectTopic,
  onNewChat, 
  onDeleteConversation,
  onDeleteSyllabus,
  user,
  onLogout
}: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-72 flex flex-col h-full bg-slate-900 text-slate-200 border-r border-slate-800 overflow-x-hidden">
      <div className="p-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-start gap-2 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
          onClick={onNewChat}
        >
          <PlusCircle className="size-4" />
          <span>New Chat</span>
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 w-full min-w-0">
        <div className="space-y-4 w-full min-w-0">
          {/* Study Folders Section */}
          <div className="space-y-1 w-full min-w-0">
            <div className="px-2 py-2 text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Study Folders
            </div>
            {syllabi.map((syllabus) => (
              <div key={syllabus._id} className="space-y-1 w-full min-w-0">
                <div 
                  className="group flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-slate-800/50 text-slate-300 transition-all min-w-0"
                  onClick={() => toggleFolder(syllabus._id)}
                >
                  {expandedFolders[syllabus._id] ? <ChevronDown className="size-3 text-slate-500 flex-shrink-0" /> : <ChevronRight className="size-3 text-slate-500 flex-shrink-0" />}
                  <Folder className="size-4 text-blue-400 flex-shrink-0" />
                  <span className="flex-1 truncate text-sm font-medium min-w-0">{syllabus.title}</span>
                  <button 
                    className="p-1 text-slate-500 hover:text-red-400 transition-colors flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSyllabus(syllabus._id);
                    }}
                  >
                    <Trash2 className="size-3" />
                  </button>
                </div>
                
                {expandedFolders[syllabus._id] && (
                  <div className="ml-4 pl-4 border-l border-slate-800 space-y-1 animate-in slide-in-from-left-2 duration-200 w-full min-w-0">
                    {syllabus.topics.map((topic: any, idx: number) => (
                      <div 
                        key={topic.id}
                        className={cn(
                          "group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors text-xs w-full min-w-0",
                          activeTopicId === topic.id ? "bg-blue-900/40 text-blue-100" : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-200"
                        )}
                        onClick={() => onSelectTopic(topic, syllabus._id)}
                      >
                        <FileText className="size-3 flex-shrink-0" />
                        <span className="flex-1 truncate min-w-0">{idx + 1}. {topic.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Regular Chats Section */}
          <div className="space-y-1 w-full min-w-0">
            <div className="px-2 py-2 text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Recent Chats
            </div>
            {conversations.map((conv) => (
              <div 
                key={conv._id}
                className={cn(
                  "group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors text-sm min-w-0",
                  activeId === conv._id ? "bg-slate-800 text-white" : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-200"
                )}
                onClick={() => onSelectConversation(conv._id)}
              >
                <MessageSquare className="size-4 flex-shrink-0 text-purple-400" />
                <span className="flex-1 truncate min-w-0">{conv.title}</span>
                <button 
                  className="p-1 text-slate-500 hover:text-red-400 transition-colors flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conv._id);
                  }}
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-slate-800 mt-auto">
        <div className="flex items-center gap-3 mb-4 px-2 py-1">
          <UserCircle className="size-8 text-slate-400" />
          <div className="flex-1 truncate">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="w-full justify-start gap-2 text-slate-400 hover:text-white hover:bg-slate-800"
          onClick={onLogout}
        >
          <LogOut className="size-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
