'use server';

import { Task } from '@/prisma/generated/client';
import { auth } from '@/lib/auth';
import { TaskService } from '@/services/task.service';

export type ActionResponse<T> =
  | { success: true; data: T; error?: never }
  | { success: false; error: string; data?: never };

export async function getTasks(): Promise<ActionResponse<Task[]>> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    const tasks = await TaskService.getTasksByUserId(session.user.id);

    return {
      success: true,
      data: tasks,
    };
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch tasks',
    };
  }
}
