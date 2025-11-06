import React from 'react';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div style={{ marginBottom: 10, textDecoration: task.completed ? 'line-through' : 'none' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <strong>{task.title}</strong>: {task.description}
      <button onClick={() => onDelete(task.id)} style={{ marginLeft: 10 }}>
        Delete
      </button>
    </div>
  );
};

export default TaskItem;