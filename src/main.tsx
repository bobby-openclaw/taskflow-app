import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TaskProvider, ThemeProvider } from '@/context';
import { Layout } from '@/components';
import { Dashboard, TaskDetail, EditTask } from '@/pages';
import { Skeleton } from '@/components/ui/skeleton';
import './index.css';

// Lazy-load the Settings page for code-splitting (see Settings.lazy.tsx)
const LazySettings = lazy(() => import('@/pages/Settings'));

const PageFallback = () => (
  <div className="p-4 space-y-4">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-64 w-full" />
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="task/:id" element={<TaskDetail />} />
              <Route path="task/:id/edit" element={<EditTask />} />
              <Route
                path="settings"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <LazySettings />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
          <Toaster richColors position="bottom-right" />
        </TaskProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
