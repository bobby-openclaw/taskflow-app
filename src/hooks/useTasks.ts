import { useReducer, useEffect } from 'react';
import type { Task } from '../types/task';
import { useLocalStorage } from './useLocalStorage';

type TaskAction =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'UPDATE_TASK'; payload: { id: string; title: string } }
  | { type: 'SET_TASKS'; payload: Task[] };

interface TaskState {
  tasks: Task[];
}

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
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task
        ),
      };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
}

const defaultTasks: Task[] = [
  { id: '1', title: 'Learn React basics', completed: true, createdAt: new Date() },
  { id: '2', title: 'Build TaskFlow app', completed: false, createdAt: new Date() },
  { id: '3', title: 'Master TypeScript', completed: false, createdAt: new Date() },
];

export function useTasks() {
  const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>('taskflow-tasks', defaultTasks);
  
  // Parse dates from stored tasks
  const initialTasks = storedTasks.map((task) => ({
    ...task,
    createdAt: new Date(task.createdAt),
  }));

  const [state, dispatch] = useReducer(taskReducer, { tasks: initialTasks });

  // Sync to localStorage
  useEffect(() => {
    setStoredTasks(state.tasks);
  }, [state.tasks, setStoredTasks]);

  // Update document title
  useEffect(() => {
    const activeCount = state.tasks.filter((t) => !t.completed).length;
    document.title = activeCount > 0 ? `TaskFlow (${activeCount})` : 'TaskFlow';
  }, [state.tasks]);

  const addTask = (title: string) => dispatch({ type: 'ADD_TASK', payload: title });
  const toggleTask = (id: string) => dispatch({ type: 'TOGGLE_TASK', payload: id });
  const deleteTask = (id: string) => dispatch({ type: 'DELETE_TASK', payload: id });
  const updateTask = (id: string, title: string) => dispatch({ type: 'UPDATE_TASK', payload: { id, title } });

  return {
    tasks: state.tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
  };
}
