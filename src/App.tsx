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
  const totalTasks = tasks.length
  const pendingCount = totalTasks - completedCount

  if (loading) {
    return (
      <div className="app-shell">
        <div className="app-loading">Loading tasks…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-shell">
        <div className="app-error">
          <strong>We hit a snag.</strong>
          <p>Could not connect to the task service. Make sure JSON Server is running.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <main className="app-container">
        <header className="app-header">
          <div>
            <h1>Task Manager</h1>
          </div>
          <div className="app-stats" aria-label="Task breakdown">
            <div className="stat-card">
              <span className="stat-label">Total</span>
              <span className="stat-value">{totalTasks}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Completed</span>
              <span className="stat-value">{completedCount}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Pending</span>
              <span className="stat-value">{pendingCount}</span>
            </div>
          </div>
        </header>

        <section className="panel">
          <h2 className="panel-title">Add a task</h2>
          <TaskForm onAddTask={addTask} />
        </section>

        <section className="panel">
          <h2 className="panel-title">Your tasks</h2>
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
          />
        </section>

        <section className="panel">
          <h2 className="panel-title">Productivity Score</h2>
          <ProductivityScore completedCount={completedCount} />
        </section>
      </main>
    </div>
  )
}

export default App
