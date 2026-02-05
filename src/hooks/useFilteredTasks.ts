import { useMemo } from 'react';
import type { Task } from '../types/task';
import type { FilterType } from '../components/TaskFilter';

export function useFilteredTasks(tasks: Task[], filter: FilterType): Task[] {
  return useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);
}
