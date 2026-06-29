# PROJECT REPORT: MERN STACK WEB DEVELOPMENT & AI INTEGRATION INTERNSHIP

## TABLE OF CONTENTS

| Chapter | Title | Page No. |
| :---: | :--- | :---: |
| | **Abstract** | **ii** |
| **1** | **Introduction** | **1** |
| | 1.1 Objectives of the Internship | 1 |
| | 1.2 Industry Profile: Aitra - Centre for Robotics & AI | 2 |
| | 1.3 Project Overview | 4 |
| **2** | **Web Development Fundamentals** | **6** |
| | 2.1 Front-End Basics (HTML, CSS, JavaScript) | 6 |
| | 2.2 Prototyping with Figma | 8 |
| | 2.3 Environment Setup using Antigravity IDE | 10 |
| **3** | **MERN Stack Development & Integration** | **13** |
| | 3.1 Backend Architecture (Node.js & Express.js APIs) | 13 |
| | 3.2 Database Configuration (MongoDB & Atlas Cluster) | 16 |
| | 3.3 Frontend Engineering with React | 19 |
| | 3.4 Full-Stack System Integration | 22 |
| **4** | **Testing & Cloud Deployment** | **25** |
| | 4.1 Validation And Verification Testing | 25 |
| | 4.2 Backend Deployment On Render | 28 |
| | 4.3 Frontend Deployment on Vercel | 31 |
| **5** | **Conclusion** | **34** |
| | 5.1 Outcomes and Key Learnings | 34 |
| | 5.2 Future Scope of the Project | 36 |
| | **References** | **38** |

---

## ABSTRACT

This project report documents the design, development, and deployment of **Eduguide**, a full-stack, AI-driven study planner and interactive educational dashboard platform. Built during a professional internship at **Aitra - Centre for Robotics & AI**, the system leverages the **MERN (MongoDB, Express.js, React, Node.js)** stack along with the Google Generative AI SDK (`gemini-2.5-flash`) to address the challenges of manual study planning and cognitive fatigue in self-directed learning.

Eduguide enables users to import unstructured syllabi as either raw text or document images. A multimodal AI pipeline processes the inputs and, using structured JSON schemas, extracts a clean curriculum hierarchy containing study topics, estimated time-boxed durations, and high-yield markdown-formatted study notes. To reinforce active learning, the platform features a focus workspace containing a Pomodoro timer tied to the topic's estimated duration, progress tracking analytics, and a context-aware conversational AI tutor that maintains user chat histories.

This report covers frontend and backend implementation, schema layouts, database indexing, user authentication via JSON Web Tokens (JWT), unit and integration testing methodologies, and cloud deployments on Render (backend) and Vercel (frontend). The project demonstrates the successful synthesis of modern full-stack engineering, AI integration, and user-centric design to build a scalable and responsive academic productivity tool.

---

## CHAPTER 1: INTRODUCTION

### 1.1 Objectives of the Internship
The primary objective of the internship at **Aitra - Centre for Robotics & AI** was to bridge the gap between academic theories of software engineering and industry-standard development workflows. The specific objectives defined for the internship period included:
1. **Full-Stack Competency:** Gaining hands-on experience in building scalable single-page web applications (SPAs) utilizing the MERN stack.
2. **Asynchronous & RESTful API Development:** Understanding how to design, write, secure, and debug RESTful APIs using Node.js and Express.js.
3. **AI Service Integration:** Learning how to connect applications with state-of-the-art Large Language Models (LLMs) such as Google's Gemini, mastering prompt engineering, multimodal document ingestion, and structured JSON parsing configurations.
4. **Database Management & Modeling:** Gaining proficiency in document-based schema design, modeling relationships, and optimization techniques like indexing in MongoDB.
5. **Modern Development Workflows:** Utilizing advanced development tools, including **Antigravity IDE** and version control systems (Git), to maintain a productive and structured workspace.
6. **Cloud Infrastructure & Deployment:** Learning production-readiness practices, configuring Cross-Origin Resource Sharing (CORS), managing environment variables, and deploying live systems to cloud providers.

### 1.2 Industry Profile: Aitra - Centre for Robotics & AI
**Aitra - Centre for Robotics & AI** is an advanced training, research, and technical services institute based in Viswanathapuram, Madurai, Tamil Nadu, India. The organization operates at the intersection of emerging technologies, focusing on bringing industrial capabilities to students, educators, and commercial enterprises.

* **Core Domains of Activity:**
  * **Educational Training:** AITRA provides structured curriculum training, bootcamps, and specialized workshops in robotics, artificial intelligence, Internet of Things (IoT), and autonomous drone technologies. 
  * **Product Development:** The center is engaged in building hardware-software integrated prototypes, automated machinery, and IoT-enabled agricultural solutions (e.g., precision drone spraying).
  * **Software Services:** AITRA delivers enterprise web applications, responsive custom portals, and AI-integrated platforms designed for commercial and academic applications.
* **Internship Ecosystem:**
  The internship program at AITRA exposes students to an active research environment. Interns are encouraged to experiment with advanced technologies, use state-of-the-art developer environments, and follow rigorous agile software practices.

### 1.3 Project Overview
Under the mentorship of engineers at AITRA, the project **Eduguide** was conceived to solve a critical issue faced by students: **syllabus planning overload**. Syllabi are typically distributed as static PDFs or text files. Breaking them down into structured study blocks, generating basic summaries, and setting aside time to review them is a tedious manual task.

* **The Proposed Solution:**
  Eduguide automates this workflow. It acts as an intelligent compiler:
  * **Ingestion:** Users upload a screenshot, photo, or copy-paste text of their syllabus.
  * **Parsing:** The system uses a multimodal AI call to structure the syllabus.
  * **Workspace:** The frontend maps the output into an interactive curriculum tree. Each topic contains custom study notes, a dedicated Pomodoro focus timer, and an AI chat tutor that has context over the topic materials.
* **Core Modules Developed:**
  1. **Authentication Module:** Secure registration and login using salted password hashing and JWT sessions.
  2. **Syllabus Manager:** Multimodal upload handlers converting images to base64 and requesting structured JSON configurations from Gemini.
  3. **Focus Workspace:** UI components displaying study guides, managing active timers, and tracking progress statistics.
  4. **AI Companion:** A chat assistant allowing students to ask questions, request examples, or generate quick quizzes, with automatic session persistence.

---

## CHAPTER 2: WEB DEVELOPMENT FUNDAMENTALS

### 2.1 Front-End Basics (HTML, CSS, JavaScript)
Creating responsive, accessible, and high-performance user interfaces requires a solid grasp of web standards:
* **Semantic HTML5:**
  The structural outline of Eduguide utilizes semantic elements (such as `<aside>` for navigation sidebars, `<main>` for workspace views, `<section>` for chat containers, and `<article>` for study notes). This ensures appropriate accessibility (screen reader friendly) and clean document object structures.
* **Modern CSS Layouts:**
  Vanilla CSS variables are used to maintain consistent colors (e.g., slate/indigo dark theme palette) and spacing. Layout placement is achieved through **Flexbox** (for alignment within toolbars, buttons, and headers) and **CSS Grid** (for the main three-panel dashboard layout, allowing independent scrolling areas).
* **Asynchronous JavaScript & TypeScript:**
  JavaScript's event loop model forms the core of client-side operations. Asynchronous actions are managed using the `async/await` syntax, capturing exceptions via `try/catch` blocks. The frontend is written in **TypeScript** to enforce type safety, defining clear interfaces for components, syllabus structures, and message arrays, which reduces runtime script errors.

### 2.2 Prototyping with Figma
Before any code was written, a detailed UI layout was prototype-designed in **Figma** to map user interactions:
* **Layout Design:** 
  A three-panel dashboard layout was established to avoid screen changes and context switching:
  1. **Left Panel:** Sidebar showing the list of study folders, topics, and previous chats.
  2. **Center Panel:** Active study topic details, notes rendered in clean markdown typography, and the Pomodoro timer.
  3. **Right Panel:** Slide-out conversational AI tutor.
* **Design Systems:**
  A unified design system was created within Figma, defining custom color styles, font weights (using the *Inter* font family), button states (default, hover, active), and spacing grids.
* **Asset Export:**
  Design systems configurations were exported as custom Tailwind CSS utility tokens and CSS variables, ensuring a 1:1 match between the Figma prototype and the actual coded application.

### 2.3 Environment Setup using Antigravity IDE
The development process was conducted inside **Antigravity IDE**, a specialized agent-integrated development environment designed to enhance coding speed and maintain project organization.
* **Project Initialization:**
  Using the command line, the project workspace was separated into structured folders:
  ```
  /edu
    /Edugudie
      /backend     - Node.js & Express server configuration
      /src         - React SPA frontend source code
      /dist        - Production builds
  ```
* **Dependency Orchestration:**
  Dependencies were initialized using Node Package Manager (`npm`). Crucial developer packages (TypeScript, Vite compiler, Tailwind tools, and Mongoose controllers) were set up and managed within the IDE.
* **AI Tool Integration:**
  Antigravity IDE's native coding assistance was used for generating clean typescript boilerplate, formatting JSON parsing schemas, writing unit tests, and verifying code execution logs directly.

---

## CHAPTER 3: MERN STACK DEVELOPMENT & INTEGRATION

### 3.1 Backend Architecture (Node.js & Express.js APIs)
The application tier of Eduguide is powered by a Node.js server running the Express.js framework:
* **Server Setup (`server.js`):**
  The entry point configures middleware for JSON body parsing, Cross-Origin Resource Sharing (CORS) limits, and logs active API requests.
* **Route Organization:**
  API paths are broken down into logical files and routers:
  * `/api/auth` — Registration and session token issuance.
  * `/api/syllabi` — Creating, retrieving, and deleting study folders.
  * `/api/conversations` — Fetching and updating AI tutor chat histories.
* **Google Generative AI SDK Integration:**
  The backend connects to `gemini-2.5-flash` using custom settings. A key development was enforcing strict JSON schemas on the Gemini API response to ensure that parsed syllabus topics are returned in a format that the React frontend can directly display without errors.

```javascript
const schema = {
  type: 'ARRAY',
  items: {
    type: 'OBJECT',
    properties: {
      id: { type: 'STRING', description: 'Unique short ID like t1' },
      title: { type: 'STRING', description: 'Topic title' },
      duration: { type: 'INTEGER', description: 'Estimated minutes' },
      notes: { type: 'STRING', description: 'Concise study notes' },
    },
    required: ['id', 'title', 'duration', 'notes'],
  },
};
```

### 3.2 Database Configuration (MongoDB & Atlas Cluster)
MongoDB serves as the data layer, selected for its document-based database structure:
* **MongoDB Atlas Cloud:**
  A cloud-hosted Atlas database was initialized, utilizing a replica-set cluster for high availability and secure access controls (IP access restrictions and user passwords).
* **Mongoose Object Data Modeling (ODM):**
  Three primary Mongoose models were implemented:
  1. **User Schema:** Stores encrypted credentials and registration timestamps.
  2. **Syllabus Schema:** Contains syllabus titles, references to the owner user, and a nested array of `topics` matching the structured JSON format from the AI.
  3. **Conversation Schema:** Stores an array of message dialogues representing chat interactions with the AI tutor.
* **Database Optimization (Indexing):**
  To maintain quick database response times (under 15ms), indexing was applied to foreign key lookups:
  ```javascript
  SyllabusSchema.index({ userId: 1 });
  ConversationSchema.index({ userId: 1, updatedAt: -1 });
  ```

### 3.3 Frontend Engineering with React
The presentation tier is built using React 18, utilizing Vite as a fast compilation server:
* **Single Page Architecture (SPA):**
  The interface runs on a single page, rendering components dynamically based on state to ensure a fluid experience.
* **Modular React Components:**
  * `AuthPage.tsx` — Login/Signup forms with validation.
  * `Sidebar.tsx` — Sidebar directory to collapse/expand folders and navigate study topics.
  * `SyllabusManager.tsx` — Syllabus file/text upload area.
  * `FocusTimer.tsx` — Customizable timer supporting the Pomodoro technique.
  * `AICompanion.tsx` — Dynamic chat window containing quick action prompts.
* **React State Management:**
  * `useState` tracks local inputs, timers, and modal visibilities.
  * `useEffect` hooks run side-effects, such as recovering local storage tokens and setting timer countdown intervals.
  * `useRef` maintains standard interval variables without triggering unnecessary UI renders.

### 3.4 Full-Stack System Integration
Connecting the client-side React app with the backend Express server was achieved through structured REST APIs:
* **CORS Handling:**
  Cross-Origin Resource Sharing is configured to allow the frontend URL to communicate securely with backend endpoints.
* **Authorization Headers:**
  Upon successful login, a JWT is generated on the server and stored in the client's `localStorage`. All subsequent requests to protected API endpoints include this token in their headers:
  ```javascript
  const res = await fetch('/api/syllabi', {
    headers: { 'x-auth-token': localStorage.getItem('token') }
  });
  ```
* **Integrated Data Flow:**
  The request-response diagram shows the full data cycle:
  ```
  [User Action: Upload] ──> [React App (Base64 Encode)]
                                    │
                                    ▼ (POST /api/syllabus/generate)
  [MongoDB Atlas] <──────── [Express Server (Verify Token)] ──> [Google Gemini API]
  (Saves structured JSON)            │                                  │
                                     ▼ (Returns Parsed Topics) <────────┘
  [User Workspace] <─────── [React App (Renders Study Cards)]
  ```

---

## CHAPTER 4: TESTING & CLOUD DEPLOYMENT

### 4.1 Validation And Verification Testing
To ensure system safety, data integrity, and a good user experience, a rigorous testing phase was carried out:
* **Verification (Process Evaluation):**
  Ensured that code was written to spec, routing files parsed parameters correctly, database schemas enforced required fields, and the frontend handled loading states.
* **Validation (Product Evaluation):**
  Ensured that the final application successfully processed real syllabi, generated correct study notes, ran focus timers accurately, and persisted chats.
* **Unit Testing:**
  Individual operations, such as password hashing using `bcryptjs` and token validation, were verified in isolation.
* **Integration Testing:**
  API endpoints were tested with sample payloads (both with valid and invalid auth tokens) to ensure security and robust database writes.
* **Testing Log Summary:**
  
| Test ID | Test Scenario | Action | Expected Output | Status |
| :---: | :--- | :--- | :--- | :---: |
| **TC-01** | Signup Validation | Submit existing email address | Returns 400 Bad Request: "User already exists" | **PASS** |
| **TC-02** | Secure API Route | Request `/api/syllabi` without JWT | Returns 401: "No token, authorization denied" | **PASS** |
| **TC-03** | Image OCR Parsing | Upload PNG syllabus screenshot | Parse OCR contents and return structured JSON | **PASS** |
| **TC-04** | Chat Persistence | Send query to AI Companion | Store message log linked to user's MongoDB record | **PASS** |

### 4.2 Backend Deployment On Render
The backend Express app is deployed to **Render.com**:
* **Production Prep:**
  The application port configuration was adjusted to listen to `process.env.PORT` with a fallback value. Start scripts were updated in `package.json` to configure the main entry point:
  ```json
  "scripts": {
    "start": "node backend/server.js"
  }
  ```
* **Deployment Steps:**
  1. Linked the Git repository to Render.
  2. Created a new **Web Service** tied to the master branch.
  3. Added environment variables on the Render control panel (`MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`).
  4. Configured CORS in the backend logic to accept calls from the production Vercel frontend URL.
  5. Run deployment and monitored startup logs.

### 4.3 Frontend Deployment on Vercel
The React frontend, built with Vite, is hosted on **Vercel**:
* **Production Build Verification:**
  Local compilation was run to verify clean builds (`npm run build`).
* **Routing Configuration (`vercel.json`):**
  Vercel requires custom redirect configuration for single-page applications to avoid "404 Not Found" errors when users refresh the page on sub-routes:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
* **Deployment Steps:**
  1. Created a project on Vercel connected to the Git repository.
  2. Configured build commands (`npm run build`) and output directory (`dist`).
  3. Configured environment variables (setting `VITE_API_URL` to point to the live Render backend Web Service).
  4. Deployed the application and verified database connectivity and AI generation speeds in production.

---

## CHAPTER 5: CONCLUSION

### 5.1 Outcomes and Key Learnings
The internship experience at **Aitra - Centre for Robotics & AI** culminated in the successful deployment of the **Eduguide** platform. Significant outcomes include:
* **Working Product:**
  Developed a live full-stack application that solves syllabus planning challenges using AI.
* **Modern MERN Proficiency:**
  Gained practical experience with React component lifecycles, global states, Express middleware, routing structures, and MongoDB document schemas.
* **Generative AI Engineering:**
  Learned how to design application logic around AI integrations, use structured JSON schemas for stable outputs, sanitize conversation logs, and handle multimodal assets.
* **DevOps Skills:**
  Gained experience with continuous deployment pipelines, managing environment variables, configuring CORS, and setting up SPA redirects.

### 5.2 Future Scope of the Project
There are several areas for future improvement and scaling of the Eduguide platform:
1. **Interactive Active Recall Quizzes:**
   Integrating a post-session evaluation workflow. When the study timer finishes, the system will prompt the user with a modal asking: *"Are you ready for the quiz?"*. This will generate a 20-question quiz customized to the study topic. The quiz results will pinpoint the user's weak points and guide them on which sub-concepts to revisit.
2. **Cognitive Rest Intermissions (Mindful Gaming):**
   Allowing users to set customizable study alerts for long-term focus (e.g., every 3 hours of continuous study). When the alert fires, a popup will prompt them to choose between continuing their session or taking a relaxing break to play one of three built-in memory games designed to relax the mind and restore focus.
3. **Calendar Platform Integration:**
   Enabling students to sync their estimated study durations and structured topics directly with external platforms like Google Calendar, Apple Calendar, or Outlook to schedule study blocks automatically.
4. **Gamification Systems:**
   Implementing study streaks, completion badges, and points tables to encourage consistent study habits.
5. **Collaboration and Study Groups:**
   Enabling peers to share generated study folders, notes, and chat transcripts with other users.
6. **Offline Access (PWA):**
   Using service workers and browser storage (such as IndexedDB) to enable students to read notes and run timers without an active internet connection.

---

## REFERENCES

1. **MongoDB Developer Documentation**  
   *URL*: https://www.mongodb.com/docs/  
   *Usage*: DB design guidelines, replica setup, and queries.

2. **Express.js API Reference**  
   *URL*: https://expressjs.com/en/4x/api.html  
   *Usage*: Implementing middlewares, router configurations, and error handling.

3. **React 18 Documentation**  
   *URL*: https://react.dev/reference/react  
   *Usage*: Managing hooks, side-effects, and component render states.

4. **Google Generative AI SDK Reference**  
   *URL*: https://ai.google.dev/gemini-api/docs  
   *Usage*: Configuring Gemini requests, Structured JSON schema parameters, and chat formats.

5. **JSON Web Token Specifications (RFC 7519)**  
   *URL*: https://datatracker.ietf.org/doc/html/rfc7519  
   *Usage*: Designing session authorization keys.
