import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { TaskProvider, ThemeProvider } from '@/context';
import { TaskForm, TaskList } from '@/components';
import { useTaskContext } from '@/context/TaskContext';
import { useFilteredTasks } from '@/hooks';
import { useState } from 'react';
import type { FilterType } from '@/components/TaskFilter';

/**
 * Integration test harness that renders the core task flow:
 * add → display → complete → filter
 */
const TestApp = () => {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTaskContext();
  const [filter, setFilter] = useState<FilterType>('all');
  const filteredTasks = useFilteredTasks(tasks, filter);

  return (
    <div>
      <TaskForm onAddTask={(title) => addTask(title)} />
      <div data-testid="task-count">{filteredTasks.length}</div>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onUpdate={updateTask}
        onDuplicate={(p) => addTask(p)}
      />
    </div>
  );
};

const renderApp = () =>
  render(
    <MemoryRouter>
      <ThemeProvider>
        <TaskProvider>
          <TestApp />
        </TaskProvider>
      </ThemeProvider>
    </MemoryRouter>,
  );

beforeEach(() => {
  localStorage.clear();
});

describe('TaskFlow integration', () => {
  it('adds a task and displays it', async () => {
    const user = userEvent.setup();
    renderApp();

    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'Integration test task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText('Integration test task')).toBeInTheDocument();
    });
  });

  it('completes a task and filters by status', async () => {
    const user = userEvent.setup();
    renderApp();

    // Add a task
    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'Task to complete');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText('Task to complete')).toBeInTheDocument();
    });

    // Toggle it complete
    const toggleBtn = screen.getByRole('button', { name: /mark as complete/i });
    await user.click(toggleBtn);

    // Filter by "Active" — task should disappear
    await user.click(screen.getByRole('button', { name: 'Active' }));
    await waitFor(() => {
      expect(screen.getByTestId('task-count').textContent).toBe('0');
    });

    // Filter by "Completed" — task should appear
    await user.click(screen.getByRole('button', { name: 'Completed' }));
    await waitFor(() => {
      expect(screen.getByTestId('task-count').textContent).toBe('1');
    });
  });
});
