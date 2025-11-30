'use client';

import { useCallback, useState, useTransition, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Task, TaskStatus } from '@/prisma/generated/client';
import { Button } from '@/components/ui/Button';
import { Plus, Loader2 } from 'lucide-react';
import { TASK_FILTER_OPTIONS } from '@/lib/constants/task.constants';
import { BUTTON_LABELS, EMPTY_STATES } from '@/lib/constants/ui.constants';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = memo(function TaskList({ tasks }: TaskListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleSuccess = useCallback(() => {
    // Use transition for smooth revalidation
    startTransition(() => {
      router.refresh();
    });
  }, [startTransition, router]);

  return (
    <div className="relative space-y-6">
      {/* Loading overlay */}
      {isPending && (
        <div className="absolute h-full w-full inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
          <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-lg">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-700 font-medium">Updating tasks...</span>
          </div>
        </div>
      )}

      <Button onClick={() => setCreateModalOpen(true)} className="flex items-center gap-2 ml-auto">
        <Plus className="w-5 h-5" />
        {BUTTON_LABELS.NEW_TASK}
      </Button>

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">{EMPTY_STATES.NO_TASKS}</p>
          <Button onClick={() => setCreateModalOpen(true)}>{BUTTON_LABELS.CREATE_FIRST_TASK}</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {Object.values(TaskStatus).map((status) => {
            const statusOption = TASK_FILTER_OPTIONS.find(opt => opt.value === status);
            const filteredTasks = tasks.filter(task => task.status === status);
            return (
              <div key={status} className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-700">
                  {statusOption?.label || status} ({filteredTasks.length})
                </h3>
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      startTransition={startTransition}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Task Modal */}
      <TaskModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
});
