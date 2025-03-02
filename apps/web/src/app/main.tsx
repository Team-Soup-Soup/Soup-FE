import '@soup/config/globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthRoutes, ProtectedRoutes } from '~/app/routes';
import { Providers } from '~/shared/utils';

const router = createBrowserRouter([AuthRoutes, ProtectedRoutes]);

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
);
