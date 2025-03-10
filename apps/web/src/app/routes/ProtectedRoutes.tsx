import { RouteObject } from 'react-router-dom';

import { AuthRouter } from '~/app/routers';
import { HomeRoutes } from '~/app/routes/HomeRoutes';

export const ProtectedRoutes: RouteObject = {
  element: <AuthRouter />,
  children: [HomeRoutes],
};
