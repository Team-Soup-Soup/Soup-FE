import { type RouteObject } from 'react-router-dom';

import { AuthLayout } from '~/app/layouts';
import { PATH } from '~/shared/constants';

import { LoginPage } from '~/pages/login/ui';
import { SignupPage } from '~/pages/signup/ui';
import { FindIdPage, FindPwPage } from '~/pages/findAccount/ui';

export const AuthRoutes: RouteObject = {
  element: <AuthLayout />,
  children: [
    { path: PATH.LOGIN, element: <LoginPage /> },
    { path: PATH.SIGNUP, element: <SignupPage /> },
    { path: PATH.FIND_ID, element: <FindIdPage /> },
    { path: PATH.FIND_PW, element: <FindPwPage /> },
  ],
};
