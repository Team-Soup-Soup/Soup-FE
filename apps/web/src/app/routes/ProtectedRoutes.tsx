import { RouteObject } from 'react-router-dom';

import { AuthRouter } from '~/app/routers';
import { HomePage } from '~/pages/home/ui';
import { PATH } from '~/shared/constants';

export const ProtectedRoutes: RouteObject = {
  element: <AuthRouter />,
  children: [{ path: PATH.HOME, element: <HomePage /> }],
};
