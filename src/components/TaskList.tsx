import React from 'react'
import type { Task } from '../types'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (task: Task) => void
  onDelete: (task: Task) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete }) => {
  if (tasks?.length === 0) return <p>No tasks available.</p>

  return (
    <>
    <h3>Task List</h3>
    <div>
      {tasks?.map(task => (
        <TaskItem
          key={task?.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
    </>
  )
}

export default TaskList
