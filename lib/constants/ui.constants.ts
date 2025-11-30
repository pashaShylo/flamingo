/**
 * UI Constants
 * Centralized configuration for UI-related values
 */

/**
 * Date formatting options
 */
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
};

/**
 * Confirmation messages
 */
export const CONFIRMATION_MESSAGES = {
  DELETE_TASK: 'Are you sure you want to delete this task?',
  DELETE_TASK_TITLE: 'Delete Task',
  DELETE_TASK_MESSAGE: 'Are you sure you want to delete this task? This action cannot be undone.',
  UNSAVED_CHANGES: 'You have unsaved changes. Are you sure you want to leave?',
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized',
  TASK_NOT_FOUND: 'Task not found or access denied',
  FETCH_TASKS_FAILED: 'Failed to fetch tasks',
  CREATE_TASK_FAILED: 'Failed to create task',
  UPDATE_TASK_FAILED: 'Failed to update task',
  DELETE_TASK_FAILED: 'Failed to delete task',
  UNEXPECTED_ERROR: 'An unexpected error occurred',
  SOMETHING_WRONG: 'Something went wrong',
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Task created successfully',
  TASK_UPDATED: 'Task updated successfully',
  TASK_DELETED: 'Task deleted successfully',
} as const;

/**
 * Form labels
 */
export const FORM_LABELS = {
  TITLE: 'Title',
  DESCRIPTION: 'Description',
  STATUS: 'Status',
  PRIORITY: 'Priority',
} as const;

/**
 * Button labels
 */
export const BUTTON_LABELS = {
  CREATE_TASK: 'Create Task',
  UPDATE_TASK: 'Update Task',
  CANCEL: 'Cancel',
  SAVE: 'Save',
  DELETE: 'Delete',
  EDIT: 'Edit',
  NEW_TASK: 'New Task',
  SIGN_OUT: 'Sign Out',
  SIGN_IN: 'Sign in with Google',
  CREATE_FIRST_TASK: 'Create your first task',
} as const;

/**
 * Placeholder text
 */
export const PLACEHOLDERS = {
  TASK_TITLE: 'Enter task title',
  TASK_DESCRIPTION: 'Enter task description (optional)',
} as const;

/**
 * Loading states
 */
export const LOADING_STATES = {
  LOADING: 'Loading...',
  LOADING_TASKS: 'Loading tasks...',
  SAVING: 'Saving...',
  DELETING: 'Deleting...',
} as const;

/**
 * Empty states
 */
export const EMPTY_STATES = {
  NO_TASKS: 'No tasks yet',
} as const;
