import { createContext, useContext, type ReactNode } from 'react';
import { useTasks } from '@/hooks';
import type { Task, Priority } from '@/types/task';

interface AddTaskPayload {
  title: string;
  priority?: Priority;
  dueDate?: Date;
  category?: string;
}

interface UpdateTaskPayload {
  id: string;
  title?: string;
  priority?: Priority;
  dueDate?: Date | null;
  category?: string;
}

interface TaskContextValue {
  tasks: Task[];
  addTask: (payload: string | AddTaskPayload) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (payload: string | UpdateTaskPayload, title?: string) => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const taskState = useTasks();

  return (
    <TaskContext.Provider value={taskState}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
