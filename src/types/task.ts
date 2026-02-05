export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority: Priority;
  dueDate?: Date;
  category?: string;
}
