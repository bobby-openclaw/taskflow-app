import { Link } from 'react-router-dom';
import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <button className="toggle-btn" onClick={() => onToggle(task.id)}>
        {task.completed ? '✓' : '○'}
      </button>
      <Link to={`/task/${task.id}`} className="task-title-link">
        <span className="task-title">{task.title}</span>
      </Link>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </div>
  );
}
