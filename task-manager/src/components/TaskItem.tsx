import React from 'react'
import type { Task } from '../types'

interface TaskItemProps {
  task: Task
  onToggleComplete: (task: Task) => void
  onDelete: (task: Task) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const status = task?.completed ? "Completed" : "Pending"

  return (
    <div style={{ marginBottom: 10}}>
      <input
        type="checkbox"
        checked={task?.completed}
        onChange={() => onToggleComplete(task)}
      />
      <strong>{task?.title}</strong>: {task?.description}
      <span style={{ marginLeft: 10, color: task?.completed ? "green" : "orange" }}>
        [Status: {status}]
      </span>
      <button onClick={() => onDelete(task)} style={{ marginLeft: 10 }}>
        Delete
      </button>
    </div>
  )
}

export default TaskItem