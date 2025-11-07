# Task Manager App

A simple task management app built with React and TypeScript. Users can add, delete, and mark tasks as completed. A productivity score tracks completed tasks, and a mock API (JSON Server) is used for persistent data.

## Features

- Add, delete, and mark tasks as completed
- Productivity score that updates and resets weekly
- Data persistence via mock API (JSON Server)
- TypeScript, Vite, ESLint, modular structure

**Install dependencies:**
npm install

**Start Development Server:**
npm run dev

### Mock API Setup (JSON Server)

1. **Install JSON Server (if not installed):**
npm install -g json-server
2. **Run the server:**
npx json-server --watch db.json --port 3001
