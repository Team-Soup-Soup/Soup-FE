import { RouteObject } from 'react-router-dom';

import { AuthRouter } from '~/app/routers';
import { HomeRoutes } from '~/app/routes/HomeRoutes';
import { ErrorPage } from '~/pages/error/ui';

export const ProtectedRoutes: RouteObject = {
  element: <AuthRouter />,
  errorElement: <ErrorPage />,
  children: [HomeRoutes],
};
