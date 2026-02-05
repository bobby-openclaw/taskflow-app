import { useState } from 'react';
import { Layout, TaskForm, TaskFilter, TaskList, type FilterType } from './components';
import type { Task } from './types/task';
import './App.css';

const initialTasks: Task[] = [
  { id: '1', title: 'Learn React basics', completed: true, createdAt: new Date() },
  { id: '2', title: 'Build TaskFlow app', completed: false, createdAt: new Date() },
  { id: '3', title: 'Master TypeScript', completed: false, createdAt: new Date() },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <Layout>
      <TaskForm onAddTask={addTask} />
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </Layout>
  );
}

export default App;
