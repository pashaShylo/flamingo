import { TaskStatus, TaskPriority as PrismaTaskPriority, TaskPriority } from '@prisma/client';

/**
 * Task Status display labels
 */
export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

/**
 * Task Priority display labels
 */
export const TASK_PRIORITY_LABELS: Record<PrismaTaskPriority, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent',
};

/**
 * Task Status options for select dropdowns
 */
export const TASK_STATUS_OPTIONS = [
  { value: TaskStatus.TODO, label: TASK_STATUS_LABELS.TODO },
  { value: TaskStatus.IN_PROGRESS, label: TASK_STATUS_LABELS.IN_PROGRESS },
  { value: TaskStatus.DONE, label: TASK_STATUS_LABELS.DONE },
] as const;

/**
 * Task Priority options for select dropdowns
 */
export const TASK_PRIORITY_OPTIONS = [
  { value: TaskPriority.LOW, label: TASK_PRIORITY_LABELS.LOW },
  { value: TaskPriority.MEDIUM, label: TASK_PRIORITY_LABELS.MEDIUM },
  { value: TaskPriority.HIGH, label: TASK_PRIORITY_LABELS.HIGH },
  { value: TaskPriority.URGENT, label: TASK_PRIORITY_LABELS.URGENT },
] as const;

/**
 * Filter options including "All"
 */
export const TASK_FILTER_OPTIONS = [
  { value: 'ALL', label: 'All' },
  ...TASK_STATUS_OPTIONS,
] as const;

/**
 * Task Status color classes for UI
 */
export const TASK_STATUS_COLORS: Record<TaskStatus, string> = {
  TODO: 'bg-gray-100 text-gray-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  DONE: 'bg-green-100 text-green-800',
};

/**
 * Task Priority color classes for borders
 */
export const TASK_PRIORITY_COLORS: Record<TaskPriority, string> = {
  LOW: 'border-l-gray-400',
  MEDIUM: 'border-l-yellow-400',
  HIGH: 'border-l-orange-400',
  URGENT: 'border-l-red-500',
};
