import { useReducer, useEffect } from 'react';
import type { Task, Priority } from '@/types/task';
import { useLocalStorage } from './useLocalStorage';

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

type TaskAction =
  | { type: 'ADD_TASK'; payload: AddTaskPayload }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'UPDATE_TASK'; payload: UpdateTaskPayload }
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
            title: action.payload.title,
            completed: false,
            createdAt: new Date(),
            priority: action.payload.priority ?? 'medium',
            dueDate: action.payload.dueDate,
            category: action.payload.category,
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
            ? {
                ...task,
                ...(action.payload.title !== undefined && { title: action.payload.title }),
                ...(action.payload.priority !== undefined && { priority: action.payload.priority }),
                ...(action.payload.dueDate !== undefined && { dueDate: action.payload.dueDate ?? undefined }),
                ...(action.payload.category !== undefined && { category: action.payload.category }),
              }
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
  { id: '1', title: 'Learn React basics', completed: true, createdAt: new Date(), priority: 'medium' },
  { id: '2', title: 'Build TaskFlow app', completed: false, createdAt: new Date(), priority: 'high', category: 'Development' },
  { id: '3', title: 'Master TypeScript', completed: false, createdAt: new Date(), priority: 'low' },
];

export function useTasks() {
  const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>('taskflow-tasks', defaultTasks);
  
  // Parse dates from stored tasks
  const initialTasks = storedTasks.map((task) => ({
    ...task,
    createdAt: new Date(task.createdAt),
    dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
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

  const addTask = (
    titleOrPayload: string | AddTaskPayload
  ) => {
    const payload = typeof titleOrPayload === 'string' 
      ? { title: titleOrPayload } 
      : titleOrPayload;
    dispatch({ type: 'ADD_TASK', payload });
  };
  
  const toggleTask = (id: string) => dispatch({ type: 'TOGGLE_TASK', payload: id });
  const deleteTask = (id: string) => dispatch({ type: 'DELETE_TASK', payload: id });
  
  const updateTask = (
    idOrPayload: string | UpdateTaskPayload,
    title?: string
  ) => {
    const payload = typeof idOrPayload === 'string'
      ? { id: idOrPayload, title }
      : idOrPayload;
    dispatch({ type: 'UPDATE_TASK', payload });
  };

  return {
    tasks: state.tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
  };
}
