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
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__fields">
        <div className="field">
          <label htmlFor="task-title">Title</label>
          <input
            id="task-title"
            type="text"
            placeholder="Add title for a task"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="task-description">Description</label>
          <input
            id="task-description"
            type="text"
            placeholder="Add a short description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  )
}

export default TaskForm