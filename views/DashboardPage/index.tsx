
'use client';
import { TaskList } from '@/components/tasks/TaskList';
import { Task } from '@/prisma/generated/client';

interface DashboardPageProps {
  tasks: Task[];
}

export default function DashboardPage({ tasks }: DashboardPageProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TaskList tasks={tasks} />
    </main>
  );
}