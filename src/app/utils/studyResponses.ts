interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export interface Topic {
  id: string;
  title: string;
  duration: number; // in minutes
  notes: string;
}

export function getTopicsFromSyllabus(syllabusName: string): Topic[] {
  // Simulate syllabus breakdown
  return [
    {
      id: "t1",
      title: "OOPS Concepts",
      duration: 20,
      notes: `OOPS (Object-Oriented Programming System) is a programming approach where software is designed using objects instead of just functions and logic.

An object represents a real-world entity and contains:
• Data → variables (attributes)
• Behavior → methods (functions)

**Why OOPS?**
OOPS helps to:
1. Make programs easy to understand
2. Improve reusability
3. Reduce complexity`
    },
    {
      id: "t2",
      title: "Data Structures",
      duration: 20,
      notes: `Data structures are special ways of organizing and storing data in a computer so that it can be used efficiently.

Common types:
• **Arrays**: Linear collection
• **Linked Lists**: Nodes with pointers
• **Stacks**: LIFO (Last In, First Out)
• **Queues**: FIFO (First In, First Out)`
    },
    {
      id: "t3",
      title: "Data Types",
      duration: 15,
      notes: `Data types define the type of data a variable can hold. 

In most languages, these include:
• **Integers**: Whole numbers
• **Floats**: Decimal numbers
• **Strings**: Text
• **Booleans**: True or False`
    }
  ];
}

// Mock AI responses for the study planner chatbot
export function generateStudyResponse(question: string, history: Message[] = []): string {
  return `That's a great question! Let me help you understand this topic better.

To provide you with the most accurate and helpful information, could you please:
• Specify what aspect you'd like to learn about
• Share any specific challenges you're facing
• Let me know your current level (beginner, intermediate, advanced)

I'm here to help with:
• Programming concepts (JavaScript, Python, React, etc.)
• Study techniques and exam preparation
• Web development (MERN stack, frontend, backend)
• Data structures and algorithms
• General learning strategies

Feel free to ask specific questions, and I'll provide detailed explanations!`;
}
