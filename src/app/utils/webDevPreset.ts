import { Topic } from "./studyResponses";

export const WEB_DEV_PRESET_TOPICS: Topic[] = [
  {
    id: "t1",
    title: "HTML Introduction",
    duration: 30,
    notes: `### HTML (HyperText Markup Language) Introduction
HTML is the standard markup language for creating web pages. It defines the basic structure of a web page using markup tags.

#### 1. Core Structure of an HTML Page
An HTML document has a nested structure. Here is a basic template:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to Web Development!</h1>
    <p>This is a paragraph of text.</p>
</body>
</html>
\`\`\`

#### 2. Key Tag Categories
* **Headings**: \`<h1>\` to \`<h6>\` (with h1 being the most important).
* **Paragraphs**: \`<p>\` for general blocks of text.
* **Hyperlinks**: \`<a href="https://google.com">Click Here</a>\` to link to other pages.
* **Images**: \`<img src="image.jpg" alt="A nice description" />\` (self-closing tag).
* **Lists**:
  * Unordered (bulleted): \`<ul>\` containing \`<li>\` items.
  * Ordered (numbered): \`<ol>\` containing \`<li>\` items.

#### 3. HTML5 Semantic Elements
Semantic elements clearly describe their meaning to both the browser and the developer:
* \`<header>\`: Defines a header for a document or section.
* \`<nav>\`: Defines a set of navigation links.
* \`<section>\`: Defines a distinct section in a document.
* \`<article>\`: Defines an independent, self-contained article.
* \`<aside>\`: Defines content aside from the page content (like a sidebar).
* \`<footer>\`: Defines a footer for a document or section.

#### 4. HTML Forms and Inputs
Forms are used to collect user input:
\`\`\`html
<form action="/submit-form" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="userName" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="userEmail">
    
    <button type="submit">Submit</button>
</form>
\`\`\`
`
  },
  {
    id: "t2",
    title: "CSS Styling & Layouts",
    duration: 35,
    notes: `### CSS (Cascading Style Sheets) Styling & Layouts
CSS is the stylesheet language used to describe the presentation and layout of a document written in HTML.

#### 1. Three Ways to Include CSS
1. **Inline CSS**: Directly inside the HTML tag using the \`style\` attribute.
   \`\`\`html
   <h1 style="color: blue; text-align: center;">Hello</h1>
   \`\`\`
2. **Internal CSS**: Inside a \`<style>\` tag in the HTML \`<head>\` section.
3. **External CSS**: In a separate \`.css\` file, linked in the HTML \`<head>\` using the \`<link>\` tag.
   \`\`\`html
   <link rel="stylesheet" href="styles.css">
   \`\`\`

#### 2. CSS Selectors
Selectors point to the HTML elements you want to style:
* **Element Selector**: Target elements by name. (e.g., \`p { color: grey; }\`)
* **Class Selector**: Target elements with a specific class attribute. Begins with a dot. (e.g., \`.btn { background-color: purple; }\`)
* **ID Selector**: Target a single unique element with a specific ID. Begins with a hash. (e.g., \`#header-main { padding: 20px; }\`)
* **State / Pseudo-classes**: Target elements in a specific state. (e.g., \`a:hover { text-decoration: underline; }\`)

#### 3. The CSS Box Model
Every HTML element is treated as a rectangular box. The box model consists of:
1. **Content**: The actual text, image, or media.
2. **Padding**: Transparent space *inside* the border, around the content.
3. **Border**: The boundary line wrapping the padding and content.
4. **Margin**: Transparent space *outside* the border, separating the element from neighbors.

\`\`\`
┌─────────────────────────────────┐
│             Margin              │
│   ┌─────────────────────────┐   │
│   │         Border          │   │
│   │   ┌─────────────────┐   │   │
│   │   │     Padding     │   │   │
│   │   │   ┌─────────┐   │   │   │
│   │   │   │ Content │   │   │   │
│   │   │   └─────────┘   │   │   │
│   │   └─────────────────┘   │   │
│   └─────────────────────────┘   │
└─────────────────────────────────┘
\`\`\`
`
  },
  {
    id: "t3",
    title: "CSS Grid & Flexbox",
    duration: 40,
    notes: `### CSS Grid & Flexbox
Modern layouts rely on Flexbox (1D layouts) and CSS Grid (2D layouts) rather than old layout hacks like floats and tables.

#### 1. CSS Flexbox (One-Dimensional Layout)
Flexbox is designed for laying out items in a single direction—either a row or a column.

**Container Properties**:
* \`display: flex;\` activates the flex container.
* \`flex-direction\`: \`row\` (default) or \`column\`.
* \`justify-content\`: Aligns items along the main axis (\`flex-start\`, \`center\`, \`flex-end\`, \`space-between\`, \`space-around\`).
* \`align-items\`: Aligns items along the cross axis (\`stretch\`, \`center\`, \`flex-start\`, \`flex-end\`).

**Item Properties**:
* \`flex-grow\`: Determines how much an item will grow relative to others.
* \`flex-shrink\`: Determines how much an item will shrink if space is limited.
* \`flex-basis\`: Sets the initial size of an item before space distribution.

#### 2. CSS Grid Layout (Two-Dimensional Layout)
CSS Grid is designed to layout content in both rows and columns simultaneously.

**Container Properties**:
* \`display: grid;\` activates the grid container.
* \`grid-template-columns\`: Defines column sizing. (e.g., \`grid-template-columns: 200px 1fr 1fr;\` where \`fr\` is a fractional unit).
* \`grid-template-rows\`: Defines row sizing.
* \`gap\` (or \`grid-gap\`): Sets spacing between rows and columns.

**Item Properties**:
* \`grid-column\`: Specifies start and end lines for column placement (e.g., \`grid-column: 1 / 3;\`).
* \`grid-row\`: Specifies start and end lines for row placement.

#### 3. When to use which?
* Use **Flexbox** for components (like navigation bars, headers, aligned icons, forms) where items are laid out linearly.
* Use **Grid** for main page structures, dashboards, and photo galleries where two-dimensional layout alignment is critical.
`
  },
  {
    id: "t4",
    title: "JavaScript Fundamentals",
    duration: 45,
    notes: `### JavaScript Fundamentals
JavaScript is a lightweight, cross-platform, interpreted scripting language that makes web pages dynamic and interactive.

#### 1. Variables and Block Scope
* \`var\`: Traditional ES5 variable declaration. Function-scoped, hoisted to the top of its scope. Avoid in modern JS.
* \`let\`: ES6 block-scoped variable. Can be reassigned.
* \`const\`: ES6 block-scoped constant. Cannot be reassigned (though objects/arrays assigned to const can still be mutated).

\`\`\`javascript
const user = "Kabi"; // Cannot change
let age = 22;       // Can change
age = 23;           // Valid
\`\`\`

#### 2. Primitive vs Reference Types
* **Primitives**: Passed by value. Immutable.
  * \`String\`, \`Number\`, \`Boolean\`, \`Null\`, \`Undefined\`, \`Symbol\`, \`BigInt\`.
* **Reference Types**: Passed by reference. Mutable.
  * \`Objects\`, \`Arrays\`, \`Functions\`.

#### 3. Functions
Functions are first-class citizens in JS, meaning they can be passed as arguments, returned from other functions, and assigned to variables.

* **Function Declaration**:
  \`\`\`javascript
  function add(a, b) {
      return a + b;
  }
  \`\`\`
* **Arrow Functions (ES6)**:
  \`\`\`javascript
  const add = (a, b) => a + b;
  \`\`\`

#### 4. Scope and Closures
* **Scope**: Dictates where variables are accessible (Global, Function, or Block scope).
* **Closure**: A function's ability to "remember" and access variables from its outer (lexical) scope even after the outer function has finished executing.
  \`\`\`javascript
  function outer() {
      let secret = "MERN Stack";
      return function inner() {
          console.log(secret); // Accesses secret
      };
  }
  const myFunc = outer();
  myFunc(); // Prints: "MERN Stack"
  \`\`\`
`
  },
  {
    id: "t5",
    title: "Control Flow: Conditions & Loops",
    duration: 30,
    notes: `### Control Flow: Conditions & Loops
Control flow structures determine the order in which individual statements in a program are executed.

#### 1. Conditional Logic
* **if...else if...else**:
  \`\`\`javascript
  const score = 85;
  if (score >= 90) {
      console.log("A Grade");
  } else if (score >= 80) {
      console.log("B Grade");
  } else {
      console.log("C Grade");
  }
  \`\`\`
* **Switch Statement**: Evaluates an expression and executes matching case blocks:
  \`\`\`javascript
  const role = "admin";
  switch (role) {
      case "admin":
          console.log("Full Access");
          break;
      case "editor":
          console.log("Edit Access");
          break;
      default:
          console.log("View Access");
  }
  \`\`\`
* **Ternary Operator**: Shorthand for if-else.
  \`\`\`javascript
  const status = age >= 18 ? "Adult" : "Minor";
  \`\`\`

#### 2. Strict (===) vs Loose (==) Equality
* \`==\` (Loose): Compares values after converting them to a common type (Type Coercion).
  * \`5 == "5"\` is \`true\`.
* \`===\` (Strict): Compares both value and type without conversion.
  * \`5 === "5"\` is \`false\`. Always use \`===\`.

#### 3. Loops
* **For Loop**: Repeating code a set number of times.
  \`\`\`javascript
  for (let i = 0; i < 5; i++) {
      console.log(i);
  }
  \`\`\`
* **While Loop**: Repeating code while a condition is true.
* **For...of**: Used to loop over array items.
  \`\`\`javascript
  const colors = ["red", "blue", "green"];
  for (const color of colors) {
      console.log(color);
  }
  \`\`\`
`
  },
  {
    id: "t6",
    title: "Data Structures: Arrays & Objects",
    duration: 40,
    notes: `### Data Structures: Arrays & Objects
Arrays and Objects are the primary reference data structures in JavaScript for organizing and storing data collections.

#### 1. JavaScript Arrays
An array is an ordered collection of elements.
* **Basic Methods**: \`push()\` (add to end), \`pop()\` (remove from end), \`shift()\` (remove from start), \`unshift()\` (add to start).
* **ES6 Iterator Helpers**:
  * **map**: Creates a new array by transforming each element.
    \`\`\`javascript
    const doubled = [1, 2, 3].map(x => x * 2); // [2, 4, 6]
    \`\`\`
  * **filter**: Creates a new array with elements passing a condition.
    \`\`\`javascript
    const evens = [1, 2, 3, 4].filter(x => x % 2 === 0); // [2, 4]
    \`\`\`
  * **reduce**: Accumulates elements into a single value.
    \`\`\`javascript
    const sum = [1, 2, 3].reduce((acc, val) => acc + val, 0); // 6
    \`\`\`

#### 2. JavaScript Objects
Objects are collections of key-value pairs.
\`\`\`javascript
const student = {
    name: "Kabilan",
    age: 22,
    greet: function() {
        return "Hello " + this.name;
    }
};
console.log(student.name);      // Dot notation
console.log(student["age"]);    // Bracket notation
\`\`\`

#### 3. Modern ES6 Features
* **Destructuring**: Pull values out of arrays or objects easily.
  \`\`\`javascript
  const { name, age } = student; // Extracts name and age
  const [first, second] = [10, 20];
  \`\`\`
* **Spread Operator (...)**: Unpacks elements.
  \`\`\`javascript
  const original = [1, 2];
  const copy = [...original, 3]; // [1, 2, 3]
  \`\`\`
* **Rest Parameter**: Gathers multiple elements into an array.
  \`\`\`javascript
  const sumAll = (...numbers) => numbers.reduce((a, b) => a + b, 0);
  \`\`\`
`
  },
  {
    id: "t7",
    title: "Asynchronous JavaScript & REST APIs",
    duration: 45,
    notes: `### Asynchronous JavaScript & REST APIs
JavaScript is single-threaded. To avoid blocking the browser during network operations, it uses an asynchronous architecture.

#### 1. The Event Loop
* **Call Stack**: Executes JavaScript statements sequentially.
* **Web APIs**: Web browser background threads that handle timers, fetches, and DOM events.
* **Callback/Microtask Queue**: Places completed async tasks waiting for execution.
* **Event Loop**: Moves tasks from the queues into the empty Call Stack.

#### 2. Promises
An object representing the completion or failure of an asynchronous operation.
* **States**: \`Pending\`, \`Fulfilled\` (success), \`Rejected\` (error).
\`\`\`javascript
const fetchData = new Promise((resolve, reject) => {
    let success = true;
    if (success) resolve("Data Loaded");
    else reject("Server Error");
});

fetchData
    .then(result => console.log(result))
    .catch(err => console.error(err));
\`\`\`

#### 3. Async / Await
Syntactic sugar built on top of Promises, making async code write and look like synchronous code.
\`\`\`javascript
async function getGithubUser(username) {
    try {
        const response = await fetch(\`https://api.github.com/users/\${username}\`);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        console.log(data.name);
    } catch (err) {
        console.error(err.message);
    }
}
\`\`\`
`
  },
  {
    id: "t8",
    title: "MERN Stack Architecture Overview",
    duration: 30,
    notes: `### MERN Stack Architecture Overview
The MERN Stack is a popular collection of JavaScript-based technologies used to build full-stack web applications.

#### 1. Component Technologies
* **MongoDB**: A document-based NoSQL database used to store application data in JSON-like formats.
* **Express.js**: A back-end web application framework for Node.js, responsible for routing HTTP requests.
* **React.js**: A front-end JavaScript library developed by Meta for building user interfaces.
* **Node.js**: A JavaScript runtime environment that lets developers run JavaScript on the server.

#### 2. Three-Tier Client-Server Architecture
MERN apps follow a classic three-tier architecture:
1. **Presentation Layer (Frontend)**: React client running inside the user's web browser. Displays components and captures user events.
2. **Application Layer (Backend)**: Express web server running on Node.js. Listens for API calls from the client, implements business logic, checks authorization, and constructs queries.
3. **Database Layer (Persistence)**: MongoDB database. Stores schemas, objects, and relationships.

#### 3. Typical Data Flow Pattern
\`\`\`
┌──────────────┐   1. HTTP POST Request    ┌──────────────┐
│  React App   ├──────────────────────────>│  Express/    │
│  (Frontend)  │<──────────────────────────┤  Node.js     │
└──────────────┘   4. Sends JSON Response  └──────┬───────┘
                                                  │      ▲
                               2. Mongoose query  │      │  3. Returns Document
                                                  ▼      │
                                           ┌─────────────┴┐
                                           │   MongoDB    │
                                           │  (Database)  │
                                           └──────────────┘
\`\`\`
`
  },
  {
    id: "t9",
    title: "React.js Introduction",
    duration: 40,
    notes: `### React.js Introduction
React is a declarative, efficient, and flexible JavaScript library for building component-based user interfaces.

#### 1. Core Principles
* **Declarative**: You describe *what* the UI should look like for a given state, and React handles updating the browser DOM to match it.
* **Component-Based**: You build encapsulated components that manage their own state, then compose them to make complex UIs.
* **Virtual DOM**: React creates an in-memory cache of the DOM. When data changes, it performs a diffing process and updates *only* what changed in the real DOM, drastically increasing rendering speeds.

#### 2. JSX (JavaScript XML)
JSX is a syntax extension for JavaScript that allows you to write HTML-like structures directly inside your JavaScript code.
\`\`\`jsx
const element = <h1 className="title">Hello, {user.name}!</h1>;
\`\`\`
JSX Rules:
1. Must return a single root element (or use a Fragment \`<></>\`).
2. Class attribute is renamed to \`className\`.
3. JavaScript expressions are evaluated inside curly braces \`{}\`.

#### 3. Component Props
Props (short for properties) are read-only inputs passed from parent components to child components.
\`\`\`jsx
// Child
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

// Parent
function App() {
    return <Welcome name="Kabilan" />;
}
\`\`\`
`
  },
  {
    id: "t10",
    title: "React State Management & Hooks",
    duration: 45,
    notes: `### React State Management & Hooks
React components re-render whenever their state or props change. Hooks are special functions that let you tap into React features in functional components.

#### 1. Component State with useState
State is local data private to a component that determines what renders on the screen.
\`\`\`jsx
import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0); // State initial value is 0

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
\`\`\`

#### 2. Side Effects with useEffect
The \`useEffect\` hook lets you perform side effects (data fetching, DOM updates, event listeners) in functional components.
\`\`\`jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Runs whenever userId changes
        fetch(\`/api/users/\${userId}\`)
            .then(res => res.json())
            .then(data => setUser(data));
            
        // Optional Cleanup Function (runs on unmount/before next effect)
        return () => console.log("Cleaning up effect");
    }, [userId]); // Dependency array
}
\`\`\`

#### 3. Hook Rules
1. Only call hooks at the **top level** (never inside loops, conditions, or nested functions).
2. Only call hooks from **React functional components** or custom hooks.
`
  },
  {
    id: "t11",
    title: "MongoDB Database Basics",
    duration: 35,
    notes: `### MongoDB Database Basics
MongoDB is an open-source, document-oriented, NoSQL database designed for ease of development and scalability.

#### 1. SQL vs NoSQL Differences
* **SQL (Relational)**: Stores data in tables with fixed columns and relationships. Uses SQL query language. (e.g., PostgreSQL, MySQL).
* **NoSQL (Document-based)**: Stores data in flexible, dynamic collections of documents. (e.g., MongoDB).

#### 2. MongoDB Document Structure
Documents are stored in a format called BSON (Binary JSON), allowing for nested data:
\`\`\`json
{
    "_id": "603d2e1f8f12a230d4181aef",
    "name": "Kabilan",
    "email": "kabi@mail.com",
    "skills": ["React", "Node", "MongoDB"],
    "profile": {
        "age": 22,
        "location": "India"
    }
}
\`\`\`

#### 3. Mongoose ODM (Object Document Mapper)
Mongoose connects Node.js to MongoDB, enforcing schemas and providing query helpers.
* **Schema**: Defines shape and validation rules.
* **Model**: A constructor compiled from a Schema representing documents in the database.

\`\`\`javascript
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    age: Number,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
export default User;
\`\`\`
`
  },
  {
    id: "t12",
    title: "Node.js Runtime Environment",
    duration: 35,
    notes: `### Node.js Runtime Environment
Node.js is an open-source, cross-platform JavaScript runtime built on Chrome's V8 engine that compiles and executes JavaScript code outside of a web browser.

#### 1. Key Node.js Features
* **Asynchronous & Non-Blocking**: Built on an event-driven loop system. I/O operations (reading files, API requests) run in the background, freeing the single main thread.
* **Single Threaded**: Runs on a single loop thread but delegates system operations to operating system threads.
* **Fast**: Compiles JS to machine code using Google V8.

#### 2. NPM (Node Package Manager)
NPM is a command-line tool and package registry that manages project dependencies:
* \`npm init\`: Creates a \`package.json\` configuration file.
* \`npm install <package>\`: Installs packages, updates \`node_modules\`, and saves them to \`package.json\`.
* \`package.json\`: Keeps track of names, versions, scripts, and dependencies.

#### 3. Core Modules
Node.js comes with built-in modules:
* **fs**: Interacting with the file system.
* **path**: Manipulating file paths.
* **http**: Creating web servers.

\`\`\`javascript
import fs from 'fs';
import path from 'path';

// Read file asynchronously
fs.readFile(path.join(process.cwd(), 'sample.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
\`\`\`
`
  },
  {
    id: "t13",
    title: "Express.js Web Framework",
    duration: 40,
    notes: `### Express.js Web Framework
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.

#### 1. Creating a Basic Express Server
\`\`\`javascript
import express from 'express';
const app = express();
const PORT = 5000;

// Enable JSON middleware parser
app.use(express.json());

// Set up route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(\`Server is running on port \${PORT}\`);
});
\`\`\`

#### 2. Request and Response Parameters
* **req.params**: Dynamic route parameters (e.g., \`/api/users/:id\` -> \`req.params.id\`).
* **req.query**: URL query parameters (e.g., \`/search?q=react\` -> \`req.query.q\`).
* **req.body**: Contains key-value pairs of data submitted in the request body (requires \`express.json()\` middleware).
* **res.status()**: Sets HTTP status.
* **res.json()**: Sends JSON payload responses.

#### 3. Middleware
Middleware functions have access to the request (\`req\`), response (\`res\`), and next middleware (\`next\`) function in the app’s request-response cycle.
\`\`\`javascript
const logger = (req, res, next) => {
    console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
    next(); // Pass control to next handler
};
app.use(logger); // Apply globally
\`\`\`
`
  },
  {
    id: "t14",
    title: "RESTful API Development",
    duration: 45,
    notes: `### RESTful API Development
REST (Representational State Transfer) is a set of design constraints and architectural principles for building web APIs.

#### 1. REST Conventions
REST APIs use standard HTTP verbs to perform CRUD operations on resources:
* **GET**: Retrieve resource(s). Should be safe and read-only.
  * \`GET /api/posts\` (Fetch list)
  * \`GET /api/posts/123\` (Fetch single post)
* **POST**: Create a new resource.
  * \`POST /api/posts\` (Sends data in body)
* **PUT / PATCH**: Update an existing resource.
  * \`PUT /api/posts/123\` (Full update)
  * \`PATCH /api/posts/123\` (Partial update)
* **DELETE**: Remove a resource.
  * \`DELETE /api/posts/123\`

#### 2. Standard HTTP Response Status Codes
* **200 OK**: Request succeeded.
* **201 Created**: Request succeeded and a resource was created.
* **400 Bad Request**: Invalid parameters or body data.
* **401 Unauthorized**: Missing or invalid credentials token.
* **403 Forbidden**: Authenticated user lacks permissions.
* **404 Not Found**: Resource not found on server.
* **500 Server Error**: Internal server crash.

#### 3. Complete REST Controller Example
\`\`\`javascript
// POST /api/items
app.post('/api/items', async (req, res) => {
    try {
        const { title, value } = req.body;
        if (!title) return res.status(400).json({ message: "Title is required" });
        
        const newItem = new Item({ title, value });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});
\`\`\`
`
  },
  {
    id: "t15",
    title: "Backend Deployment (Render)",
    duration: 40,
    notes: `### Backend Deployment (Render)
To make your backend server accessible online, you must deploy it to a hosting service. Render is a popular, developer-friendly cloud hosting platform.

#### 1. Preparing the Code for Production
1. **Dynamic Port**: Do not hardcode ports. Bind to \`process.env.PORT\`:
   \`\`\`javascript
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(\`Server on \${PORT}\`));
   \`\`\`
2. **Start Script**: Define start script in \`package.json\`:
   \`\`\`json
   "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
   }
   \`\`\`
3. **Hide Keys**: Ensure all secrets (MongoDB URLs, JWT tokens) are loaded via \`dotenv\` and not committed to GitHub.

#### 2. Deploying on Render
1. Create a Render account and link your GitHub profile.
2. Select **New +** > **Web Service**.
3. Link your backend code repository.
4. Set configuration parameters:
   * **Environment**: \`Node\`
   * **Build Command**: \`npm install\`
   * **Start Command**: \`npm start\`
5. Open the **Environment** tab and add environment variables:
   * \`PORT = 5000\`
   * \`MONGODB_URI = mongodb+srv://...\`
   * \`JWT_SECRET = ...\`
6. Click **Deploy Web Service**. Render will build and expose a public URL like \`https://project-backend.onrender.com\`.
`
  },
  {
    id: "t16",
    title: "Frontend Deployment (Vercel)",
    duration: 40,
    notes: `### Frontend Deployment (Vercel)
Vercel is a global cloud platform designed to deploy static websites and single-page applications (like React) instantly with high performance.

#### 1. Preparing React for Deployment
1. **Configure API URL**: Ensure your React application dynamically connects to the production backend URL instead of \`localhost:5000\`.
   \`\`\`typescript
   export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   \`\`\`
2. **Test Build**: Run \`npm run build\` locally to verify Vite compiles code without TypeScript/syntax errors. It generates files in the \`dist/\` folder.

#### 2. Routing Configuration (vercel.json)
In single-page applications, routes are handled client-side by React Router. If a user refreshes a subpage like \`domain.com/dashboard\`, Vercel attempts to load a file named \`dashboard\` and fails with a 404.
Create a \`vercel.json\` in your React root folder to rewrite all requests back to \`index.html\`:
\`\`\`json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
\`\`\`

#### 3. Deploying
1. Push your code to GitHub.
2. Connect your GitHub account to Vercel.
3. Import your project repository.
4. Vercel automatically detects Vite. Ensure the output directory is set to \`dist\`.
5. Under Environment Variables, add \`VITE_API_URL\` pointing to your deployed Render URL.
6. Click **Deploy**. Vercel will host the frontend on an SSL-secured domain.
`
  },
  {
    id: "t17",
    title: "System Architecture & Design Pattern (Archint)",
    duration: 40,
    notes: `### System Architecture & Design Pattern (Archint)
System Architecture (Archint) focuses on the structural organization of components to make sure web applications are modular, scalable, and easy to maintain.

#### 1. Separation of Concerns (SoC)
Divide your application into distinct sections, where each handles a separate aspect of the program:
* **Presentation**: React components concerned purely with visual design, user inputs, and local state.
* **Business Logic**: Express controllers processing request validations, data calculations, and calling database APIs.
* **Data Access (Models)**: Mongoose schemas modeling collections, data formats, types, and relations.
* **Configuration**: Storing API keys, server ports, and constants in independent files (\`.env\`, \`config.ts\`).

#### 2. Directory Structure Conventions
A clean MERN backend folder structure helps developer collaboration:
\`\`\`
backend/
├── config/             # DB and system configs
├── controllers/        # Route handler functions (logic)
├── models/             # Mongoose DB schema definitions
├── routes/             # Express HTTP endpoint paths
├── middleware/         # Custom authentication and logging handlers
├── server.js           # Server startup file
└── package.json
\`\`\`

#### 3. Database Modeling Relations
* **Normalized (Referencing)**: Documents reference other documents by \`ObjectId\`. Saves storage space, keeps documents small, but requires queries to fetch (populate). Perfect for 1-to-many or many-to-many relationships.
* **Denormalized (Embedding)**: Child documents are saved directly as nested subdocuments inside the parent. Faster read operations (retrieves everything in one query), but document sizes are limited (max 16MB) and updates can be complex.
`
  },
  {
    id: "t18",
    title: "Course Conclusion & Best Practices",
    duration: 30,
    notes: `### Course Conclusion & Best Practices
Congratulations on completing the Full-Stack Web Development curriculum! Let's review standard industry best practices to build production-ready applications.

#### 1. Security Best Practices
* **Encrypt Passwords**: Never store raw user passwords. Always use salt-hashing algorithms like \`bcryptjs\` on user signup.
* **Token Authentication**: Secure backend routes using JSON Web Tokens (JWT). Protect endpoints by checking the request \`x-auth-token\` header.
* **CORS Policies**: Explicitly limit cross-origin resource sharing to your trusted deployed domain instead of leaving it open (*).

#### 2. Code Quality & Standards
* **DRY (Don't Repeat Yourself)**: Extract repeating code snippets (like API fetches or styling layouts) into utility files or custom hooks.
* **TypeScript Validation**: Use TypeScript type-safety annotations to catch bugs at compile-time instead of runtime.
* **Component Modularity**: Keep React components under 200 lines. Split visual elements into small, reusable components (e.g., buttons, inputs, alerts).

#### 3. Next Steps in Your Learning Journey
1. **State Management**: Explore global state managers like Redux Toolkit (\`RTK\`) or Zustand for large applications.
2. **Testing**: Write unit and integration tests using Jest and React Testing Library to verify application mechanics automatically.
3. **Continuous Integration (CI/CD)**: Set up automatic GitHub Actions to run tests, checks, and deployments whenever you merge pull requests.
`
  }
];
