import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BookOpen, MessageSquare, Clock, TrendingUp } from "lucide-react";

export function StudyStats() {
  const stats = [
    {
      title: "Questions Asked",
      value: "24",
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Study Time",
      value: "5.2h",
      icon: Clock,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Topics Covered",
      value: "12",
      icon: BookOpen,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Streak",
      value: "7 days",
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`size-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
