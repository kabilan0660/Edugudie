import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Lightbulb, BookMarked, Calendar, Target } from "lucide-react";

interface QuickActionsProps {
  onQuestionClick: (question: string) => void;
}

export function QuickActions({ onQuestionClick }: QuickActionsProps) {
  const suggestedQuestions = [
    {
      icon: Lightbulb,
      question: "What is the MERN stack?",
      color: "text-yellow-500",
    },
    {
      icon: BookMarked,
      question: "Explain React hooks",
      color: "text-blue-500",
    },
    {
      icon: Calendar,
      question: "How to prepare for exams?",
      color: "text-green-500",
    },
    {
      icon: Target,
      question: "Study tips for programming",
      color: "text-purple-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Questions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {suggestedQuestions.map((item) => (
          <Button
            key={item.question}
            variant="outline"
            className="justify-start h-auto py-3 px-4"
            onClick={() => onQuestionClick(item.question)}
          >
            <item.icon className={`size-4 mr-2 shrink-0 ${item.color}`} />
            <span className="text-left text-sm">{item.question}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
