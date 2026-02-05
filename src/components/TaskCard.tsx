import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Circle, X } from 'lucide-react';
import type { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
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
      
      <Link 
        to={`/task/${task.id}`} 
        className={`flex-1 hover:text-primary transition-colors ${
          task.completed ? 'line-through text-muted-foreground' : ''
        }`}
      >
        {task.title}
      </Link>

      <Badge variant={task.completed ? 'success' : 'warning'}>
        {task.completed ? 'Done' : 'Active'}
      </Badge>
      
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <X className="h-4 w-4" />
      </Button>
    </Card>
  );
}
