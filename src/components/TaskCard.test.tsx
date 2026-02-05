import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { TaskCard } from './TaskCard';
import type { Task } from '@/types/task';

const baseTask: Task = {
  id: '1',
  title: 'Test Task',
  completed: false,
  createdAt: new Date('2025-01-15'),
  priority: 'medium',
};

const completedTask: Task = { ...baseTask, id: '2', completed: true };

const defaultHandlers = {
  onToggle: vi.fn(),
  onDelete: vi.fn(),
  onUpdate: vi.fn(),
  onDuplicate: vi.fn(),
};

const renderCard = (task: Task = baseTask, handlers = defaultHandlers) =>
  render(
    <MemoryRouter>
      <TaskCard task={task} {...handlers} />
    </MemoryRouter>,
  );

describe('TaskCard', () => {
  it('renders the task title', () => {
    renderCard();
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('renders the priority badge', () => {
    renderCard();
    expect(screen.getByText('medium')).toBeInTheDocument();
  });

  it('shows Active badge for incomplete tasks', () => {
    renderCard();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('shows Done badge for completed tasks', () => {
    renderCard(completedTask);
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('applies opacity styling when task is completed', () => {
    const { container } = renderCard(completedTask);
    const card = container.querySelector('.opacity-60');
    expect(card).not.toBeNull();
  });

  it('applies line-through styling when task is completed', () => {
    renderCard(completedTask);
    const link = screen.getByText('Test Task');
    expect(link.className).toContain('line-through');
  });

  it('calls onToggle with task id when toggle button clicked', async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    renderCard(baseTask, { ...defaultHandlers, onToggle });

    const btn = screen.getByRole('button', { name: /mark as complete/i });
    await user.click(btn);
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete is confirmed via the alert dialog', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    renderCard(baseTask, { ...defaultHandlers, onDelete });

    // Open the dropdown menu
    const menuBtn = screen.getByRole('button', { name: /open menu/i });
    await user.click(menuBtn);

    // Click Delete menu item
    const deleteItem = screen.getByRole('menuitem', { name: /delete/i });
    await user.click(deleteItem);

    // Confirm in the alert dialog
    const confirmBtn = screen.getByRole('button', { name: /delete/i });
    await user.click(confirmBtn);

    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
