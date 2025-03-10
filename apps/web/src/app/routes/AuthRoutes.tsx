import { type RouteObject } from 'react-router-dom';

import { AuthLayout } from '~/app/layouts';
import { PATH } from '~/shared/constants';

import { LoginPage } from '~/pages/login/ui';
import { SignupPage } from '~/pages/signup/ui';
import { FindAccountPage } from '~/pages/find-account/ui';
import { ErrorPage } from '~/pages/error/ui';

export const AuthRoutes: RouteObject = {
  element: <AuthLayout />,
  errorElement: <ErrorPage />,
  children: [
    { path: PATH.LOGIN, element: <LoginPage /> },
    { path: PATH.SIGNUP, element: <SignupPage /> },
    { path: PATH.FIND_ID, element: <FindAccountPage id="ID" /> },
    { path: PATH.FIND_PW, element: <FindAccountPage id="PW" /> },
  ],
};
