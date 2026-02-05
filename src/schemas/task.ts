import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Task title is required')
    .min(3, 'Task title must be at least 3 characters')
    .max(100, 'Task title must be less than 100 characters'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  dueDate: z.date().optional().nullable(),
  category: z.string().optional(),
});

export const editTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Task title is required')
    .min(3, 'Task title must be at least 3 characters')
    .max(100, 'Task title must be less than 100 characters'),
  completed: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.date().optional().nullable(),
  category: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
export type EditTaskFormData = z.infer<typeof editTaskSchema>;
