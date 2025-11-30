'use client';

import Error from '@/components/ui/Error';

export default function DashboardError({ error }: { error: Error }) {
  return <Error error={error} />;
}