import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTaskContext } from '@/context';

export const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, toggleTask, deleteTask } = useTaskContext();
  
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-2xl animate-fade-in">
      <Link 
        to="/" 
        className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tasks
      </Link>
      
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-2xl">{task.title}</CardTitle>
            <Badge variant={task.completed ? 'success' : 'warning'}>
              {task.completed ? 'Completed' : 'Active'}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Created:</span>{' '}
            {task.createdAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3">
          <Button onClick={() => toggleTask(task.id)}>
            Mark as {task.completed ? 'Active' : 'Completed'}
          </Button>
          <Button variant="secondary" asChild>
            <Link to={`/task/${task.id}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button 
            variant="destructive"
            onClick={() => deleteTask(task.id)}
            asChild
          >
            <Link to="/">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
