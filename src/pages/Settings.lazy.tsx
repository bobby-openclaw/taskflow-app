import { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Settings = lazy(() => import('./Settings'));

export const SettingsPage = () => {
  return (
    <Suspense fallback={<div className="p-4"><Skeleton className="h-64 w-full" /></div>}>
      <Settings />
    </Suspense>
  );
}
