import React, { useState } from 'react'

interface TaskFormProps {
  onAddTask: (title: string, description: string) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAddTask(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ marginRight: 10 }}
        required
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm