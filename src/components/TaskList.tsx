import { memo, useMemo } from 'react';
import type { Task, Priority } from '@/types/task';
import { TaskCard } from './TaskCard';

// ──────────────────────────────────────────────────────────
// React DevTools Profiler: wrap <TaskList> in a <Profiler>
// to measure render time and identify unnecessary re-renders.
//
//   import { Profiler } from 'react';
//   <Profiler id="TaskList" onRender={(id, phase, actualDuration) => {
//     console.log(`${id} ${phase} took ${actualDuration}ms`);
//   }}>
//     <TaskList ... />
//   </Profiler>
// ──────────────────────────────────────────────────────────

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (payload: { id: string; title?: string; priority?: Priority; dueDate?: Date | null; category?: string }) => void;
  onDuplicate: (payload: { title: string; priority?: Priority; dueDate?: Date; category?: string }) => void;
  sortBy?: 'date' | 'priority' | 'title';
  filterCompleted?: boolean;
}

const priorityWeight: Record<Priority, number> = { high: 3, medium: 2, low: 1 };

/**
 * TaskList — wrapped with React.memo so it only re-renders when its props
 * change by shallow comparison. This prevents the entire list from
 * re-rendering when unrelated parent state (like the theme) updates.
 */
export const TaskList = memo(({ tasks, onToggle, onDelete, onUpdate, onDuplicate, sortBy, filterCompleted }: TaskListProps) => {
  // useMemo: avoid recomputing filtered + sorted tasks on every render.
  // The computation only re-runs when tasks, sortBy, or filterCompleted change.
  const processedTasks = useMemo(() => {
    let result = tasks;

    // Optional completed filter
    if (filterCompleted !== undefined) {
      result = result.filter((t) => t.completed === filterCompleted);
    }

    // Optional sort
    if (sortBy === 'priority') {
      result = [...result].sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    } else if (sortBy === 'title') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'date') {
      result = [...result].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    return result;
  }, [tasks, sortBy, filterCompleted]);

  if (processedTasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No tasks yet</p>
        <p className="text-sm mt-1">Add a task to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {processedTasks.map((task) => (
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
});

TaskList.displayName = 'TaskList';
