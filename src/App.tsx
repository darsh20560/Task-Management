import { useState, useEffect } from 'react'
import './App.css'
import type { Task } from './types'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import ProductivityScore from './components/ProductivityScore'

const API_URL = 'http://localhost:3001/tasks'

function App() {
const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch tasks on mount
  useEffect(() => {
    fetch(API_URL)
      ?.then(res => {
        if (!res?.ok) throw new Error('Failed to fetch tasks')
        return res?.json()
      })
      ?.then(data => {
        // console.log('Fetched tasks:', data)
        setTasks(data)
        setLoading(false)
      })
      ?.catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const addTask = (title: string, description: string) => {
    const newTask = { title, description, completed: false }
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add task')
        return res.json()
      })
      .then(createdTask => setTasks(prev => [...prev, createdTask]))
      .catch(err => alert(err.message))
  }

  const toggleComplete = (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed }
    fetch(`${API_URL}/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: updatedTask.completed }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update task')
        return res.json()
      })
      .then(() => {
        setTasks(prev =>
          prev.map(t => (t.id === task.id ? updatedTask : t))
        )
      })
      .catch(err => alert(err.message))
  }

  const deleteTask = (task: Task) => {
    fetch(`${API_URL}/${task?.id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete task')
        setTasks(prev => prev.filter(t => t.id !== task?.id))
      })
      .catch(err => alert(err.message))
  }

  const completedCount = tasks.filter(t => t.completed).length
  // console.log('Completed tasks count:', completedCount)

  if (loading) return <div>Loading tasks...</div>
  if (error) {
    return (
      <div>
        <strong>Error:</strong> Could not connect to API.
        <p>Please ensure JSON Server is running.</p>
      </div>
    )
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', width: '100vw', top: 0, left: 0, position: 'absolute'}}>
      <div style={{ maxWidth: 600, padding: 20}}>
        <h1>Task Manager</h1>
        <TaskForm onAddTask={addTask} />
        <TaskList tasks={tasks} onToggleComplete={toggleComplete} onDelete={deleteTask} />
        <ProductivityScore completedCount={completedCount} />
      </div>
    </div>
  )
}

export default App
