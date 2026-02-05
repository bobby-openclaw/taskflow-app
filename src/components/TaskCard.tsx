import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MoreHorizontal, Check, Circle, Pencil, Trash2, Copy, CalendarDays } from 'lucide-react';
import { Card } from '@/components/ui/card';
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

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  low: { label: '🟢 Low', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  medium: { label: '🟡 Medium', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  high: { label: '🔴 High', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
};

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (payload: { id: string; title?: string; priority?: Priority; dueDate?: Date | null; category?: string }) => void;
  onDuplicate: (payload: { title: string; priority?: Priority; dueDate?: Date; category?: string }) => void;
}

export const TaskCard = ({ task, onToggle, onDelete, onUpdate, onDuplicate }: TaskCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteDialog(false);
  };

  const handleEdit = (data: { title: string; priority: Priority; dueDate?: Date; category?: string }) => {
    onUpdate({
      id: task.id,
      ...data,
    });
  };

  const handleDuplicate = () => {
    onDuplicate({
      title: task.title,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category,
    });
  };

  return (
    <>
      <Card 
        className={`flex items-center gap-3 p-4 animate-slide-up hover:shadow-lg transition-all ${
          task.completed ? 'opacity-60' : ''
        }`}
      >
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </Button>
        
        <div className="flex-1 min-w-0">
          <Link 
            to={`/task/${task.id}`} 
            className={`block hover:text-primary transition-colors truncate ${
              task.completed ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {task.title}
          </Link>
          {(task.dueDate || task.category) && (
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              {task.dueDate && (
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {format(task.dueDate, 'MMM d')}
                </span>
              )}
              {task.category && <span>• {task.category}</span>}
            </div>
          )}
        </div>

        <Badge className={priorityConfig[task.priority].className}>
          {task.priority}
        </Badge>

        <Badge variant={task.completed ? 'success' : 'warning'}>
          {task.completed ? 'Done' : 'Active'}
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicate}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => setShowDeleteDialog(true)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TaskDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        task={task}
        onSave={handleEdit}
        mode="edit"
      />
    </>
  );
}
