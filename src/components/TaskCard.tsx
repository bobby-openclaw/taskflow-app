import { Link } from 'react-router-dom';
import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className={`card flex items-center gap-3 p-4 ${task.completed ? 'opacity-60' : ''}`}>
      <button 
        className="btn-ghost p-2 text-lg"
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? '✓' : '○'}
      </button>
      <Link 
        to={`/task/${task.id}`} 
        className={`flex-1 hover:text-indigo-400 transition-colors ${
          task.completed ? 'line-through text-gray-500' : ''
        }`}
      >
        {task.title}
      </Link>
      <button 
        className="btn-ghost p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20"
        onClick={() => onDelete(task.id)}
      >
        ✕
      </button>
    </div>
  );
}
