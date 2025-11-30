import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { LOADING_STATES } from '@/lib/constants/ui.constants';

export default function DashboardLoading() {
  return <LoadingSpinner text={LOADING_STATES.LOADING_TASKS} /> 
}
