'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-center py-12">
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 inline-block">
        {error.message}
      </div>
    </div>
  );
};