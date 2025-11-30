import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getTasks } from '@/actions/task.actions';
import { DEFAULT_SIGNOUT_REDIRECT } from '@/lib/constants/routes.constants';
import DashboardPage from '@/views/DashboardPage';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect(DEFAULT_SIGNOUT_REDIRECT);
  }

  const result = await getTasks();

  if (!result.success) {
    throw new Error(result.error);
  }

  return <DashboardPage tasks={result.data} />;
}
