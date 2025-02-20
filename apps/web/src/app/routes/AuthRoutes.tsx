import { type RouteObject } from 'react-router-dom';

import { LoginPage } from '~/pages/login/ui';
import { AuthLayout } from '~/app/layouts';
import { PATH } from '~/shared/constants';

export const AuthRoutes: RouteObject = {
  element: <AuthLayout />,
  children: [
    { path: PATH.LOGIN, element: <LoginPage /> },
    { path: PATH.SIGNUP },
  ],
};
