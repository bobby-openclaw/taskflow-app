import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useTaskContext } from '../context';
import { EditTaskForm } from '../components/EditTaskForm';

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
    <div className="edit-task">
      <h2>Edit Task</h2>
      <EditTaskForm task={task} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}
