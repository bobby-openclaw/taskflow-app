import { useState } from 'react';
import { Layout, TaskForm, TaskFilter, TaskList, type FilterType } from './components';
import { TaskProvider, ThemeProvider, useTaskContext } from './context';
import './App.css';

function TaskApp() {
  const { tasks, addTask, toggleTask, deleteTask } = useTaskContext();
  const [filter, setFilter] = useState<FilterType>('all');

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

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <TaskApp />
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
