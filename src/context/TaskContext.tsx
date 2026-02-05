import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Task } from '../types/task';

const STORAGE_KEY = 'taskflow-tasks';

type TaskAction =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_TASKS'; payload: Task[] };

interface TaskState {
  tasks: Task[];
}

interface TaskContextValue extends TaskState {
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: crypto.randomUUID(),
            title: action.payload,
            completed: false,
            createdAt: new Date(),
          },
        ],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
}

function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((task: Task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
    }
  } catch (e) {
    console.error('Failed to load tasks from localStorage:', e);
  }
  return [
    { id: '1', title: 'Learn React basics', completed: true, createdAt: new Date() },
    { id: '2', title: 'Build TaskFlow app', completed: false, createdAt: new Date() },
    { id: '3', title: 'Master TypeScript', completed: false, createdAt: new Date() },
  ];
}

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, { tasks: loadTasks() });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Update document title with task count
  useEffect(() => {
    const activeCount = state.tasks.filter((t) => !t.completed).length;
    document.title = activeCount > 0 ? `TaskFlow (${activeCount})` : 'TaskFlow';
  }, [state.tasks]);

  const addTask = (title: string) => dispatch({ type: 'ADD_TASK', payload: title });
  const toggleTask = (id: string) => dispatch({ type: 'TOGGLE_TASK', payload: id });
  const deleteTask = (id: string) => dispatch({ type: 'DELETE_TASK', payload: id });

  return (
    <TaskContext.Provider value={{ ...state, addTask, toggleTask, deleteTask }}>
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
