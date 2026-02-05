import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowUpDown, Check, Circle, MoreHorizontal, Pencil, Trash2, Copy } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { TaskDialog } from './TaskDialog';
import type { Task, Priority } from '@/types/task';

type SortField = 'title' | 'completed' | 'createdAt' | 'priority';
type SortDirection = 'asc' | 'desc';

const priorityOrder: Record<Priority, number> = { low: 0, medium: 1, high: 2 };
const priorityConfig: Record<Priority, { className: string }> = {
  low: { className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  medium: { className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  high: { className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
};

interface TaskTableProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (payload: { id: string; title?: string; priority?: Priority; dueDate?: Date | null; category?: string }) => void;
  onDuplicate: (payload: { title: string; priority?: Priority; dueDate?: Date; category?: string }) => void;
}

export function TaskTable({ tasks, onToggle, onDelete, onUpdate, onDuplicate }: TaskTableProps) {
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'completed':
          comparison = Number(a.completed) - Number(b.completed);
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'priority':
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [tasks, sortField, sortDirection]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = () => {
    if (deleteTask) {
      onDelete(deleteTask.id);
      setDeleteTask(null);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No tasks yet</p>
        <p className="text-sm mt-1">Add a task to get started!</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Status</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => toggleSort('title')}
                  className="h-8 px-2"
                >
                  Title
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => toggleSort('priority')}
                  className="h-8 px-2"
                >
                  Priority
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Due</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => toggleSort('createdAt')}
                  className="h-8 px-2"
                >
                  Created
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onToggle(task.id)}
                  >
                    {task.completed ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell>
                  <Link 
                    to={`/task/${task.id}`}
                    className={`hover:text-primary ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {task.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge className={priorityConfig[task.priority].className}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {task.dueDate ? format(task.dueDate, 'MMM d') : '—'}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {format(task.createdAt, 'MMM d')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditTask(task)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicate({ 
                        title: task.title, 
                        priority: task.priority,
                        dueDate: task.dueDate,
                        category: task.category,
                      })}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => setDeleteTask(task)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteTask} onOpenChange={() => setDeleteTask(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteTask?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TaskDialog
        open={!!editTask}
        onOpenChange={() => setEditTask(null)}
        task={editTask}
        onSave={(data) => {
          if (editTask) onUpdate({ id: editTask.id, ...data });
        }}
        mode="edit"
      />
    </>
  );
}
