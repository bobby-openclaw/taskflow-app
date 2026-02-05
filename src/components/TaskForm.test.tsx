import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TaskForm } from './TaskForm';

describe('TaskForm', () => {
  it('renders the input and add button', () => {
    render(<TaskForm onAddTask={vi.fn()} />);
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('calls onAddTask with the entered title on submit', async () => {
    const onAddTask = vi.fn();
    const user = userEvent.setup();
    render(<TaskForm onAddTask={onAddTask} />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'Buy groceries');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(onAddTask).toHaveBeenCalledWith('Buy groceries');
    });
  });

  it('clears the input after successful submit', async () => {
    const user = userEvent.setup();
    render(<TaskForm onAddTask={vi.fn()} />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'Buy groceries');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('shows validation error when submitting empty title', async () => {
    const onAddTask = vi.fn();
    const user = userEvent.setup();
    render(<TaskForm onAddTask={onAddTask} />);

    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText(/task title is required/i)).toBeInTheDocument();
    });
    expect(onAddTask).not.toHaveBeenCalled();
  });

  it('shows validation error when title is too short', async () => {
    const onAddTask = vi.fn();
    const user = userEvent.setup();
    render(<TaskForm onAddTask={onAddTask} />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'ab');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument();
    });
    expect(onAddTask).not.toHaveBeenCalled();
  });
});
