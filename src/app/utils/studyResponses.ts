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
  const lowerQuestion = question.toLowerCase();

  // Simple Context Awareness for follow-ups
  const lastAiMessage = [...history].reverse().find(m => !m.isUser)?.text.toLowerCase() || "";

  if (lowerQuestion.includes("more") || lowerQuestion.includes("explain") || lowerQuestion.includes("detail")) {
    if (lastAiMessage.includes("mern")) {
      return `Sure! Let's dive deeper into the MERN stack. 
      
Most developers start with React for the frontend and Node.js with Express for the backend. MongoDB is great because you can store data exactly how it looks in your JavaScript code (JSON). 

Which part of the MERN stack would you like to build first?`;
    }
    if (lastAiMessage.includes("react hook")) {
      return `Definitely. React Hooks like **useEffect** are used for "side effects". 

For example, if you want to fetch data from an API when a component first loads, you use \`useEffect(() => { ... }, [])\`. 

Do you want to see a code example of a specific hook?`;
    }
  }

  if (lowerQuestion.includes("example") || lowerQuestion.includes("code")) {
    if (lastAiMessage.includes("mern") || lastAiMessage.includes("mongo")) {
      return `Here is a simple example of a MongoDB schema using Mongoose:

\`\`\`javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
\`\`\`

This defines what a "User" looks like in your database.`;
    }
  }

  // MERN Stack
  if (lowerQuestion.includes("mern") || lowerQuestion.includes("mern stack")) {
    return `The MERN stack is a popular web development technology stack consisting of four main technologies:

• MongoDB - A NoSQL database that stores data in flexible, JSON-like documents
• Express.js - A minimal and flexible Node.js web application framework
• React - A JavaScript library for building user interfaces
• Node.js - A JavaScript runtime built on Chrome's V8 engine

The MERN stack is entirely JavaScript-based, making it efficient for full-stack development. It's commonly used for building dynamic web applications and single-page applications (SPAs).`;
  }

  // React Hooks
  if (lowerQuestion.includes("react hook") || lowerQuestion.includes("hooks")) {
    return `React Hooks are functions that let you use state and other React features in functional components. Key hooks include:

• useState - Manages state in functional components
• useEffect - Handles side effects like data fetching and subscriptions
• useContext - Accesses context values without wrapping components
• useReducer - Manages complex state logic
• useRef - Creates mutable references that persist across renders
• useMemo - Memoizes expensive calculations
• useCallback - Memoizes callback functions

Hooks were introduced in React 16.8 to make code more reusable and easier to understand without using class components.`;
  }

  // Exam preparation
  if (lowerQuestion.includes("exam") || lowerQuestion.includes("test")) {
    return `Here are effective strategies to prepare for exams:

1. Create a Study Schedule - Plan your study time well in advance
2. Active Recall - Test yourself regularly instead of just re-reading
3. Spaced Repetition - Review material at increasing intervals
4. Practice Problems - Solve past papers and sample questions
5. Study Groups - Collaborate with peers to fill knowledge gaps
6. Take Breaks - Use the Pomodoro Technique (25 min study, 5 min break)
7. Sleep Well - Get 7-9 hours of sleep, especially before the exam
8. Stay Healthy - Eat nutritious food and exercise regularly

Remember: Understanding concepts is more important than memorization!`;
  }

  // Programming study tips
  if (lowerQuestion.includes("programming") || lowerQuestion.includes("coding")) {
    return `Here are essential tips for studying programming:

1. Practice Coding Daily - Consistency is key to improving
2. Build Projects - Apply what you learn in real applications
3. Read Documentation - Learn to navigate official docs effectively
4. Debug Systematically - Understand errors instead of just fixing them
5. Code Review - Read others' code to learn different approaches
6. Use Version Control - Master Git and GitHub early
7. Solve Algorithms - Practice on platforms like LeetCode, HackerRank
8. Explain Concepts - Teaching others reinforces your understanding
9. Stay Updated - Follow tech blogs and communities
10. Don't Copy-Paste - Type code manually to build muscle memory

Start small, be patient, and celebrate small victories!`;
  }

  // JavaScript
  if (lowerQuestion.includes("javascript") || lowerQuestion.includes("js")) {
    return `JavaScript is a versatile programming language essential for web development:

Key Concepts:
• Variables (let, const, var)
• Data types (strings, numbers, booleans, objects, arrays)
• Functions (regular, arrow, async)
• DOM manipulation
• Event handling
• Promises and async/await
• ES6+ features (destructuring, spread operator, modules)

JavaScript runs in browsers and on servers (Node.js), making it a full-stack language. Focus on understanding closures, prototypes, and the event loop for advanced proficiency.`;
  }

  // Python
  if (lowerQuestion.includes("python")) {
    return `Python is a high-level, interpreted programming language known for its simplicity:

Key Features:
• Clean, readable syntax
• Versatile (web dev, data science, AI, automation)
• Large standard library
• Strong community support
• Cross-platform compatibility

Popular Use Cases:
• Web development (Django, Flask)
• Data analysis (Pandas, NumPy)
• Machine learning (TensorFlow, scikit-learn)
• Automation and scripting
• Scientific computing

Great for beginners due to its English-like syntax!`;
  }

  // Data structures
  if (lowerQuestion.includes("data structure")) {
    return `Data structures are ways to organize and store data efficiently:

Common Data Structures:
• Arrays - Fixed-size, indexed collection
• Linked Lists - Nodes connected by pointers
• Stacks - LIFO (Last In, First Out)
• Queues - FIFO (First In, First Out)
• Trees - Hierarchical structure (Binary Trees, BST)
• Graphs - Nodes connected by edges
• Hash Tables - Key-value pairs for fast lookup
• Heaps - Special tree for priority operations

Choosing the right data structure impacts your program's performance significantly!`;
  }

  // Algorithms
  if (lowerQuestion.includes("algorithm")) {
    return `Algorithms are step-by-step procedures to solve problems:

Key Algorithm Categories:
• Searching (Binary Search, Linear Search)
• Sorting (Quick Sort, Merge Sort, Bubble Sort)
• Divide and Conquer
• Dynamic Programming
• Greedy Algorithms
• Backtracking
• Graph Algorithms (BFS, DFS, Dijkstra)

Important Concepts:
• Time Complexity (Big O notation)
• Space Complexity
• Optimization techniques

Practice regularly on coding platforms to master algorithmic thinking!`;
  }

  // Default response
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
