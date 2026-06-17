import { useState } from "react";
import { Plus, Play, FileText, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Topic, getTopicsFromSyllabus } from "../utils/studyResponses";
import { toast } from "sonner";
const API_BASE = import.meta.env.VITE_API_URL || '';
interface SyllabusManagerProps {
  onTopicsGenerated: (topics: Topic[], title: string) => void;
  onTopicSelect: (topic: Topic) => void;
  topics: Topic[];
  activeTopicId?: string | null;
}

export function SyllabusManager({ 
  onTopicsGenerated, 
  onTopicSelect, 
  topics,
  activeTopicId 
}: SyllabusManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [syllabusTitle, setSyllabusTitle] = useState("");

  const handleUpload = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to analyze a syllabus');
      return;
    }
    setIsUploading(true);
    try {
      let payload: any = { title: syllabusTitle || fileName || 'My Syllabus' };

      if (selectedFile) {
        if (selectedFile.type.startsWith('image/')) {
          // Read image file as base64
          const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              const base64 = result.split(',')[1]; // Strip "data:image/...;base64," prefix
              resolve(base64);
            };
            reader.onerror = () => reject(new Error("Failed to read image file"));
            reader.readAsDataURL(selectedFile);
          });
          payload.image = base64Data;
          payload.mimeType = selectedFile.type;
        } else {
          // Read text file contents
          const syllabusText = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve((e.target?.result as string) || "");
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsText(selectedFile);
          });
          payload.syllabusText = syllabusText;
        }
      } else {
        payload.syllabusText = "No syllabus content provided";
      }

      const res = await fetch(`${API_BASE}/api/syllabus/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.message || 'Failed to generate topics');
        return;
      }
      const data = await res.json();
      const generatedTopics = data.topics;
      onTopicsGenerated(generatedTopics, syllabusTitle || fileName || 'My Syllabus');
    } catch (e) {
      console.error('Syllabus generation error:', e);
      toast.error('Error contacting AI service');
    } finally {
      setIsUploading(false);
      setFileName('');
      setSelectedFile(null);
      setSyllabusTitle('');
    }
  };

  if (topics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-white border rounded-2xl p-6 shadow-sm max-w-sm mb-4 relative">
          <p className="text-slate-700 font-medium leading-relaxed">
            <span className="font-bold text-purple-600">Ai Teach :</span> Hello! What you like to learn today? Add your syllabus to get started!
          </p>
          <div className="absolute -bottom-2 left-6 size-4 bg-white border-r border-b rotate-45" />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="group relative size-48 md:size-56 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center shadow-inner active:scale-95 transition-all outline-none">
              <div className="absolute inset-2 rounded-full border-4 border-white border-dashed opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="size-32 md:size-36 rounded-full bg-blue-400 group-hover:bg-blue-500 flex items-center justify-center shadow-xl transition-colors border-8 border-white/30">
                <Plus className="size-16 md:size-20 text-white" />
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold">Upload your syllabus !!</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex flex-col items-center gap-3">
                <Button variant="secondary" className="w-full h-12 text-lg font-bold bg-slate-900 text-white hover:bg-slate-800 rounded-xl" asChild>
                  <label className="cursor-pointer">
                    Choose File
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*,.txt,.md,.json"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setSelectedFile(file);
                        setFileName(file?.name || "");
                      }} 
                    />
                  </label>
                </Button>
                {fileName && <p className="text-xs text-slate-500 font-medium">Selected: {fileName}</p>}
                
                <div className="w-full space-y-1">
                  <p className="text-sm font-medium text-slate-600">Syllabus Title (Optional)</p>
                  <Input 
                    value={syllabusTitle}
                    onChange={(e) => setSyllabusTitle(e.target.value)}
                    placeholder="Enter title..."
                    className="rounded-xl border-slate-300"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="flex gap-2 sm:justify-center">
              <Button 
                onClick={handleUpload} 
                disabled={!fileName || isUploading}
                className="flex-1 h-12 text-lg font-bold bg-slate-900 rounded-xl"
              >
                {isUploading ? "Analyzing..." : "Upload"}
              </Button>
              <DialogClose asChild>
                <Button variant="outline" className="flex-1 h-12 text-lg font-bold rounded-xl">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      <div className="bg-white border rounded-2xl p-6 shadow-sm mb-8 relative border-l-4 border-l-purple-500 animate-in slide-in-from-top duration-500">
        <p className="text-slate-700 font-medium">
          <span className="font-bold text-purple-600">Ai Teach :</span> Great I've Analyzed your syllabus and broken into topics; Let's Get started!!
        </p>
      </div>

      <div className="grid gap-4">
        {topics.map((topic, index) => (
          <Card 
            key={topic.id} 
            className={`border-2 transition-all cursor-pointer hover:shadow-md ${activeTopicId === topic.id ? 'border-purple-500 bg-purple-50/50' : 'border-slate-100'}`}
            onClick={() => onTopicSelect(topic)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-slate-800">Topic {index + 1}: {topic.title}</h3>
                <p className="text-sm text-slate-500 font-medium">{topic.duration} Min</p>
              </div>
              <div className="size-12 rounded-full bg-slate-900 flex items-center justify-center shadow-lg transition-transform active:scale-90">
                <Play className="size-6 text-white ml-1 fill-white" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
