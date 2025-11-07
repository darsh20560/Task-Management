import React from 'react'
import type { Task } from '../types'

interface TaskItemProps {
  task: Task
  onToggleComplete: (task: Task) => void
  onDelete: (task: Task) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const status = task.completed ? 'Completed' : 'Pending'

  return (
    <article className={`task-item${task.completed ? ' task-item--completed' : ''}`}>
      <label className="task-item__checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task)}
          aria-label={task.completed ? 'Mark task as pending' : 'Mark task as complete'}
        />
      </label>

      <div className="task-item__content">
        <div className="task-item__header">
          <h3>{task.title}</h3>
          <span className={`task-item__status task-item__status--${task.completed ? 'completed' : 'pending'}`}>
            {status}
          </span>
        </div>
        {task.description ? <p>{task.description}</p> : null}
      </div>

      <button
        type="button"
        onClick={() => onDelete(task)}
        className="btn"
        aria-label={`Delete task ${task.title}`}
      >
        Delete
      </button>
    </article>
  )
}

export default TaskItem