import '@soup/config/globals.css';
import './App.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthRoutes, ProtectedRoutes } from '~/app/routes';
import { ErrorPage } from '~/pages/error/ui';
import { Providers } from '~/shared/utils';

const router = createBrowserRouter([
  { ...AuthRoutes, errorElement: <ErrorPage /> },
  { ...ProtectedRoutes, errorElement: <ErrorPage /> },
]);

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
);
