import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTaskContext } from '@/context';
import { EditTaskForm } from '@/components/EditTaskForm';

export function EditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTaskContext();
  
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return <Navigate to="/" replace />;
  }

  const handleSave = (title: string) => {
    updateTask(task.id, title);
    navigate(`/task/${task.id}`);
  };

  const handleCancel = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <div className="max-w-2xl animate-fade-in">
      <Link 
        to={`/task/${task.id}`}
        className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Task
      </Link>
      <h2 className="text-2xl font-bold mb-6">Edit Task</h2>
      <EditTaskForm task={task} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}
