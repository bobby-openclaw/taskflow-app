import type { Task, Priority } from '@/types/task';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (payload: { id: string; title?: string; priority?: Priority; dueDate?: Date | null; category?: string }) => void;
  onDuplicate: (payload: { title: string; priority?: Priority; dueDate?: Date; category?: string }) => void;
}

export function TaskList({ tasks, onToggle, onDelete, onUpdate, onDuplicate }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No tasks yet</p>
        <p className="text-sm mt-1">Add a task to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onDuplicate={onDuplicate}
        />
      ))}
    </div>
  );
}
