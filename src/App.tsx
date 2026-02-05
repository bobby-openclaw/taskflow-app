import { TaskCard } from './components/TaskCard';
import type { Task } from './types/task';
import './App.css';

const initialTasks: Task[] = [
  { id: '1', title: 'Learn React basics', completed: true, createdAt: new Date() },
  { id: '2', title: 'Build TaskFlow app', completed: false, createdAt: new Date() },
  { id: '3', title: 'Master TypeScript', completed: false, createdAt: new Date() },
];

function App() {
  return (
    <div className="app">
      <h1>TaskFlow</h1>
      <div className="task-list">
        {initialTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default App;
