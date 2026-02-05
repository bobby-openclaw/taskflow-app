import { useState } from 'react';
import { TaskForm, TaskFilter, TaskList, type FilterType } from '../components';
import { useTaskContext } from '../context';
import { useFilteredTasks } from '../hooks';

export function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask } = useTaskContext();
  const [filter, setFilter] = useState<FilterType>('all');
  const filteredTasks = useFilteredTasks(tasks, filter);

  return (
    <div className="dashboard">
      <h2>My Tasks</h2>
      <TaskForm onAddTask={addTask} />
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}
