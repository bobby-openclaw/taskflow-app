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
    <div className="max-w-2xl">
      <Link 
        to="/" 
        className="inline-flex items-center gap-1 text-gray-400 hover:text-indigo-400 mb-6 transition-colors"
      >
        ← Back to Tasks
      </Link>
      
      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        
        <div className="space-y-2 mb-6">
          <p className="flex items-center gap-2">
            <span className="text-gray-400">Status:</span>
            <span className={`px-2 py-0.5 rounded text-sm ${
              task.completed 
                ? 'bg-green-900/30 text-green-400' 
                : 'bg-amber-900/30 text-amber-400'
            }`}>
              {task.completed ? 'Completed' : 'Active'}
            </span>
          </p>
          <p className="text-gray-400">
            <span>Created:</span>{' '}
            <span className="text-gray-200">
              {task.createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button 
            className="btn btn-primary"
            onClick={() => toggleTask(task.id)}
          >
            Mark as {task.completed ? 'Active' : 'Completed'}
          </button>
          <Link to={`/task/${task.id}/edit`}>
            <button className="btn btn-secondary">Edit Task</button>
          </Link>
          <Link to="/">
            <button 
              className="btn btn-danger"
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
