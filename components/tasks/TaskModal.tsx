'use client';

import { memo, useCallback } from 'react';
import { Task } from '@/prisma/generated/client';
import { Modal } from '@/components/ui/Modal';
import { TaskForm } from './TaskForm';
import { BUTTON_LABELS } from '@/lib/constants/ui.constants';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  onSuccess: () => void;
}

export const TaskModal = memo(function TaskModal({ isOpen, onClose, task, onSuccess }: TaskModalProps) {
  const handleSuccess = useCallback(() => {
    onSuccess();
    onClose();
  }, [onSuccess, onClose]);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={task ? BUTTON_LABELS.UPDATE_TASK : BUTTON_LABELS.CREATE_TASK}
    >
      <TaskForm
        task={task}
        onSuccess={handleSuccess}
        onCancel={onClose}
      />
    </Modal>
  );
});
