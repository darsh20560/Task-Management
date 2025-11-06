import React, { useState } from 'react'
import './App.css'
import type { Task } from './types'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { v4 as uuidv4 } from 'uuid'

function App() {
const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (title: string, description: string) => {
    const newTask: Task = { id: uuidv4(), title, description, completed: false }
    setTasks(prev => [...prev, newTask])
  }

  const toggleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onToggleComplete={toggleComplete} onDelete={deleteTask} />
    </div>
  )
}

export default App
