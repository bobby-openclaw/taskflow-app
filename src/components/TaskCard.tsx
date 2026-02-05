import { Link } from 'react-router-dom';
import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div 
      className={`card flex items-center gap-3 p-4 animate-slide-up hover:shadow-lg transition-shadow duration-200 ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <button 
        className="btn-ghost p-2 text-lg rounded-full"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        <span className={`transition-transform duration-200 inline-block ${task.completed ? 'scale-110' : ''}`}>
          {task.completed ? '✓' : '○'}
        </span>
      </button>
      <Link 
        to={`/task/${task.id}`} 
        className={`flex-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 ${
          task.completed ? 'line-through text-gray-500 dark:text-gray-500' : ''
        }`}
      >
        {task.title}
      </Link>
      <button 
        className="btn-ghost p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        ✕
      </button>
    </div>
  );
}
