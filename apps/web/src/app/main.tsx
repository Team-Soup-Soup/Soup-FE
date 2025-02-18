import './globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthRouter } from '~/app/routers';
import { AuthLayout } from '~/app/layouts';

import { HomePage } from '~/pages/home/ui';
import { LoginPage } from '~/pages/login/ui';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: '/login', element: <LoginPage /> }, { path: '/signup' }],
  },
  {
    element: <AuthRouter />,
    children: [{ path: '/', element: <HomePage /> }],
  },
]);

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
