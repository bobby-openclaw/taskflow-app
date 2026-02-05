import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskFilter, TaskList, type FilterType } from '@/components';
import { TaskDialog } from '@/components/TaskDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTaskContext } from '@/context';
import { useFilteredTasks } from '@/hooks';

export function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTaskContext();
  const [filter, setFilter] = useState<FilterType>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
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

      <div className="flex gap-3 mb-6">
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <TaskFilter filter={filter} onFilterChange={setFilter} />
      <TaskList 
        tasks={filteredTasks} 
        onToggle={toggleTask} 
        onDelete={deleteTask}
        onUpdate={updateTask}
        onDuplicate={addTask}
      />

      <TaskDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSave={addTask}
        mode="add"
      />
    </div>
  );
}
