import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider, ThemeProvider } from './context';
import { Layout } from './components';
import { Dashboard, TaskDetail, Settings } from './pages';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="task/:id" element={<TaskDetail />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </TaskProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
