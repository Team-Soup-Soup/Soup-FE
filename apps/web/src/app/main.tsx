import '@soup/config/globals.css';
import './App.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthRoutes, InviteRoute, ProtectedRoutes } from '~/app/routes';
import { ErrorPage } from '~/pages/error/ui';
import { Providers } from '~/shared/utils';
import { ToastContainer } from '~/shared/ui';

const router = createBrowserRouter([
  { ...AuthRoutes, errorElement: <ErrorPage /> },
  { ...ProtectedRoutes, errorElement: <ErrorPage /> },
  { ...InviteRoute, errorElement: <ErrorPage /> },
]);

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Providers>
        <RouterProvider router={router} />
        <ToastContainer />
      </Providers>
    </QueryClientProvider>
  </StrictMode>,
);
