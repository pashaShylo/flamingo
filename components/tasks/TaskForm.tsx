'use client';

import { useTransition, memo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task, TaskStatus, TaskPriority } from '@/prisma/generated/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Loader2 } from 'lucide-react';
import { createTask, updateTask } from '@/lib/api/client';
import { taskFormSchema, type TaskFormValues } from '@/lib/validations/task';
import { TASK_STATUS_OPTIONS, TASK_PRIORITY_OPTIONS } from '@/lib/constants/task.constants';
import { FORM_LABELS, BUTTON_LABELS, PLACEHOLDERS, LOADING_STATES, ERROR_MESSAGES } from '@/lib/constants/ui.constants';

interface TaskFormProps {
  task?: Task | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const TaskForm = memo(function TaskForm({ task, onSuccess, onCancel }: TaskFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    setError,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || TaskStatus.TODO,
      priority: task?.priority || TaskPriority.MEDIUM,
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    startTransition(async () => {
      try {
        const result = task
          ? await updateTask({ id: task.id, ...data })
          : await createTask(data);

        if (result.success) {
          onSuccess();
        } else {
          setError('root', {
            type: 'manual',
            message: result.error || ERROR_MESSAGES.SOMETHING_WRONG,
          });
        }
      } catch {
        setError('root', {
          type: 'manual',
          message: ERROR_MESSAGES.UNEXPECTED_ERROR,
        });
      }
    });
  };

  return (
    <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('title')}
          label={FORM_LABELS.TITLE}
          placeholder={PLACEHOLDERS.TASK_TITLE}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Textarea
          {...register('description')}
          label={FORM_LABELS.DESCRIPTION}
          placeholder={PLACEHOLDERS.TASK_DESCRIPTION}
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Select
            {...register('status')}
            label={FORM_LABELS.STATUS}
            options={TASK_STATUS_OPTIONS}
          />
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        <div>
          <Select
            {...register('priority')}
            label={FORM_LABELS.PRIORITY}
            options={TASK_PRIORITY_OPTIONS}
          />
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
          )}
        </div>
      </div>

      {errors.root && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {errors.root.message}
        </div>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending} className="flex-1 flex items-center justify-center gap-2">
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {isPending ? LOADING_STATES.SAVING : task ? BUTTON_LABELS.UPDATE_TASK : BUTTON_LABELS.CREATE_TASK}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isPending}>
          {BUTTON_LABELS.CANCEL}
        </Button>
      </div>
    </form>
  );
});
