import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { TaskService } from '@/services/task.service';
import { updateTaskSchema, deleteTaskSchema } from '@/lib/validations/task';
import {
  requireAuth,
  successResponse,
  withErrorHandler,
} from '@/lib/api/utils';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export const PATCH = withErrorHandler(
  async (request: NextRequest, context: RouteContext) => {
    const session = await requireAuth();

    const { id } = await context.params;

    const body = await request.json();
    const validated = updateTaskSchema.parse({ id, ...body });

    const task = await TaskService.updateTask(validated, session.user.id);

    // Revalidate tasks page to show updated task
    revalidatePath('/tasks', 'page');

    return successResponse(task);
  },
  'PATCH /api/task/[id]'
);

export const DELETE = withErrorHandler(
  async (_request: NextRequest, context: RouteContext) => {

    const session = await requireAuth();

    const { id } = await context.params;

    const validated = deleteTaskSchema.parse({ id });

    const task = await TaskService.deleteTask(validated, session.user.id);

    // Revalidate tasks page to remove deleted task
    revalidatePath('/tasks', 'page');

    return successResponse(task);
  },
  'DELETE /api/task/[id]'
);
