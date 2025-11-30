import { Loader } from '@/components/ui/Loader';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader />
    </div>
  );
}
