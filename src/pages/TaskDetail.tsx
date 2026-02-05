import { useParams, Link, Navigate } from 'react-router-dom';
import { useTaskContext } from '../context';

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const { tasks, toggleTask, deleteTask } = useTaskContext();
  
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="task-detail">
      <Link to="/" className="back-link">← Back to Tasks</Link>
      
      <div className="task-detail-card">
        <h2>{task.title}</h2>
        
        <div className="task-meta">
          <p>
            <strong>Status:</strong>{' '}
            <span className={task.completed ? 'status-completed' : 'status-active'}>
              {task.completed ? 'Completed' : 'Active'}
            </span>
          </p>
          <p>
            <strong>Created:</strong>{' '}
            {task.createdAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <div className="task-actions">
          <button 
            className="toggle-status-btn"
            onClick={() => toggleTask(task.id)}
          >
            Mark as {task.completed ? 'Active' : 'Completed'}
          </button>
          <Link to={`/task/${task.id}/edit`}>
            <button className="edit-task-btn">Edit Task</button>
          </Link>
          <Link to="/">
            <button 
              className="delete-task-btn"
              onClick={() => deleteTask(task.id)}
            >
              Delete Task
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
