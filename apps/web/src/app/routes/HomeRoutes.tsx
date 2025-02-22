import { type RouteObject } from 'react-router-dom';

import { HomeLayout } from '~/app/layouts';
import { HomePage } from '~/pages/home/ui';
import { PATH } from '~/shared/constants';

export const HomeRoutes: RouteObject = {
  element: <HomeLayout />,
  children: [{ path: PATH.HOME, element: <HomePage /> }],
};
