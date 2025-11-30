import { prisma } from '@/lib/prisma';
import { Task, TaskStatus, TaskPriority } from '@prisma/client';
import {
  CreateTaskInput,
  UpdateTaskInput,
  DeleteTaskInput,
} from '@/lib/validations/task';
import { ERROR_MESSAGES } from '@/lib/constants/ui.constants';

export class TaskService {
  static async getTasksByUserId(userId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getTaskById(taskId: string, userId: string): Promise<Task | null> {
    return prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });
  }

  static async createTask(
    data: CreateTaskInput,
    userId: string
  ): Promise<Task> {
    return prisma.task.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  static async updateTask(
    data: UpdateTaskInput,
    userId: string
  ): Promise<Task> {
    const { id, ...updateData } = data;

    const task = await this.getTaskById(id, userId);
    if (!task) {
      throw new Error(ERROR_MESSAGES.TASK_NOT_FOUND);
    }

    return prisma.task.update({
      where: { id },
      data: updateData,
    });
  }

  static async deleteTask(
    data: DeleteTaskInput,
    userId: string
  ): Promise<Task> {
    const { id } = data;

    const task = await this.getTaskById(id, userId);
    if (!task) {
      throw new Error(ERROR_MESSAGES.TASK_NOT_FOUND);
    }

    return prisma.task.delete({
      where: { id },
    });
  }

  static async getTasksByStatus(
    userId: string,
    status: TaskStatus
  ): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        userId,
        status,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getTasksByPriority(
    userId: string,
    priority: TaskPriority
  ): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        userId,
        priority,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
