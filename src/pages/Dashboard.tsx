import { useState } from 'react';
import { TaskForm, TaskFilter, TaskList, type FilterType } from '@/components';
import { Badge } from '@/components/ui/badge';
import { useTaskContext } from '@/context';
import { useFilteredTasks } from '@/hooks';

export function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask } = useTaskContext();
  const [filter, setFilter] = useState<FilterType>('all');
  const filteredTasks = useFilteredTasks(tasks, filter);

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <div className="flex gap-2">
          <Badge variant="warning">{activeCount} active</Badge>
          <Badge variant="success">{completedCount} done</Badge>
        </div>
      </div>
      <TaskForm onAddTask={addTask} />
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}
