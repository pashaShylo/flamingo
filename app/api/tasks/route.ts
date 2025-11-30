import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { TaskService } from '@/services/task.service';
import { createTaskSchema } from '@/lib/validations/task';
import {
  requireAuth,
  successResponse,
  parseRequestBody,
  withErrorHandler,
} from '@/lib/api/utils';
import { CLIENT_ROUTES } from '@/lib/constants/routes.constants';

export const POST = withErrorHandler(async (request: NextRequest) => {
  // Authenticate user
  const session = await requireAuth();

  // Parse and validate request body
  const validated = await parseRequestBody(request, createTaskSchema);

  // Create task
  const task = await TaskService.createTask(validated, session.user.id);

  // Revalidate tasks page to show new task
  revalidatePath(CLIENT_ROUTES.DASHBOARD, 'page');

  // Return success response with 201 Created status
  return successResponse(task, 201);
}, 'POST /api/tasks');
