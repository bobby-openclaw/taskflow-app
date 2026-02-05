import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <span className="task-title">{task.title}</span>
      <span className="task-status">
        {task.completed ? '✓' : '○'}
      </span>
    </div>
  );
}
