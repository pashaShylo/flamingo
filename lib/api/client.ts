/**
 * API Client for Task Operations
 * Handles all HTTP requests to the tasks API with proper error handling
 */

import { Task, TaskStatus, TaskPriority } from '@prisma/client';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

interface CreateTaskData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

interface UpdateTaskData extends CreateTaskData {
  id: string;
}

/**
 * Create a new task
 */
export async function createTask(data: CreateTaskData): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to create task',
      };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Update an existing task
 */
export async function updateTask(data: UpdateTaskData): Promise<ApiResponse> {
  try {
    const { id, ...updateData } = data;
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to update task',
      };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Delete a task by ID
 */
export async function deleteTask(id: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to delete task',
      };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}
