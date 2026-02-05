import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Task title is required')
    .min(3, 'Task title must be at least 3 characters')
    .max(100, 'Task title must be less than 100 characters'),
});

export const editTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Task title is required')
    .min(3, 'Task title must be at least 3 characters')
    .max(100, 'Task title must be less than 100 characters'),
  completed: z.boolean(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
export type EditTaskFormData = z.infer<typeof editTaskSchema>;
