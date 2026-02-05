import { useState } from 'react';
import { Plus, LayoutGrid, Table as TableIcon } from 'lucide-react';
import { toast } from 'sonner';
import { TaskList } from '@/components/TaskList';
import { TaskTable } from '@/components/TaskTable';
import { TaskDialog } from '@/components/TaskDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTaskContext } from '@/context';
import type { Priority } from '@/types/task';

type ViewMode = 'cards' | 'table';

export const Dashboard = () => {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTaskContext();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  const handleAddTask = (data: { title: string; priority: Priority; dueDate?: Date; category?: string }) => {
    addTask(data);
    toast.success('Task created', { description: `"${data.title}" has been added.` });
  };

  const handleToggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    toggleTask(id);
    if (task) {
      toast.success(
        task.completed ? 'Task marked as active' : 'Task completed!',
        { description: task.title }
      );
    }
  };

  const handleDeleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    deleteTask(id);
    if (task) {
      toast.success('Task deleted', { description: `"${task.title}" has been removed.` });
    }
  };

  const handleUpdateTask = (payload: { id: string; title?: string; priority?: Priority; dueDate?: Date | null; category?: string }) => {
    updateTask(payload);
    toast.success('Task updated', { description: 'Task has been updated successfully.' });
  };

  const handleDuplicateTask = (payload: { title: string; priority?: Priority; dueDate?: Date; category?: string }) => {
    addTask({ ...payload, title: `${payload.title} (copy)` });
    toast.success('Task duplicated', { description: `A copy of "${payload.title}" has been created.` });
  };

  const allTasks = tasks;
  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const TaskView = viewMode === 'cards' ? TaskList : TaskTable;

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
        <div className="flex border rounded-lg">
          <Button 
            variant={viewMode === 'cards' ? 'default' : 'ghost'} 
            size="icon"
            onClick={() => setViewMode('cards')}
            className="rounded-r-none"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'table' ? 'default' : 'ghost'} 
            size="icon"
            onClick={() => setViewMode('table')}
            className="rounded-l-none"
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({allTasks.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeTasks.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <TaskView 
            tasks={allTasks} 
            onToggle={handleToggleTask} 
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            onDuplicate={handleDuplicateTask}
          />
        </TabsContent>
        
        <TabsContent value="active">
          <TaskView 
            tasks={activeTasks} 
            onToggle={handleToggleTask} 
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            onDuplicate={handleDuplicateTask}
          />
        </TabsContent>
        
        <TabsContent value="completed">
          <TaskView 
            tasks={completedTasks} 
            onToggle={handleToggleTask} 
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            onDuplicate={handleDuplicateTask}
          />
        </TabsContent>
      </Tabs>

      <TaskDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSave={handleAddTask}
        mode="add"
      />
    </div>
  );
}
