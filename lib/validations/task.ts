import { z } from 'zod';
import { TaskStatus, TaskPriority } from '@prisma/client';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().max(2000, 'Description is too long').optional(),
  status: z.enum(TaskStatus).default(TaskStatus.TODO),
  priority: z.enum(TaskPriority).default(TaskPriority.MEDIUM),
});

export const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().max(2000, 'Description is too long'),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
});

export const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long').optional(),
  description: z.string().max(2000, 'Description is too long').optional().nullable(),
  status: z.enum(TaskStatus).optional(),
  priority: z.enum(TaskPriority).optional(),
});

export const deleteTaskSchema = z.object({
  id: z.string(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;
export type TaskFormValues = z.infer<typeof taskFormSchema>;
