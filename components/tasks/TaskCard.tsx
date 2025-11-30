'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@prisma/client';
import { Pencil, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { TaskModal } from './TaskModal';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { deleteTask } from '@/lib/api/client';
import { TASK_STATUS_COLORS, TASK_PRIORITY_COLORS, TASK_STATUS_LABELS } from '@/lib/constants/task.constants';
import { BUTTON_LABELS, DATE_FORMAT_OPTIONS, CONFIRMATION_MESSAGES } from '@/lib/constants/ui.constants';

interface TaskCardProps {
  task: Task;
  startTransition: (callback: () => void) => void;
}

export function TaskCard({ task, startTransition }: TaskCardProps) {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', DATE_FORMAT_OPTIONS);

  const handleDeleteConfirm = async () => {
    setDeleteModalOpen(false);

    // Use transition to show loading state without freezing UI
    startTransition(async () => {
      await deleteTask(task.id);
      router.refresh();
    });
  };

  const handleSuccess = () => {
    // Use transition for smooth revalidation
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Card className={`border-l-4 ${TASK_PRIORITY_COLORS[task.priority]} hover:shadow-lg transition-shadow`}>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${TASK_STATUS_COLORS[task.status]}`}>
            {TASK_STATUS_LABELS[task.status]}
          </span>
        </div>
        
        {task.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
        )}
        
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="w-3 h-3 mr-1" />
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span className="font-medium">{task.priority}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setEditModalOpen(true)}
          className="flex items-center gap-1"
        >
          <Pencil className="w-4 h-4" />
          {BUTTON_LABELS.EDIT}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDeleteModalOpen(true)}
          className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
          {BUTTON_LABELS.DELETE}
        </Button>
      </CardFooter>

      {/* Edit Task Modal */}
      <TaskModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        task={task}
        onSuccess={handleSuccess}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={CONFIRMATION_MESSAGES.DELETE_TASK_TITLE}
        message={CONFIRMATION_MESSAGES.DELETE_TASK_MESSAGE}
        confirmLabel={BUTTON_LABELS.DELETE}
        cancelLabel={BUTTON_LABELS.CANCEL}
        isDanger={true}
      />
    </Card>
  );
}
