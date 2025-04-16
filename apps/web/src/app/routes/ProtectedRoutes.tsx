import { RouteObject } from 'react-router-dom';

import { AuthRouter, HomeRouter } from '~/app/routers';

import { fetchJoinedRoom } from '~/shared/utils';
import { LoadingPage } from '~/shared/ui';
import { HomeRoutes } from './HomeRoutes';
import { DefaultPage } from '~/pages/default/ui';
import { PATH } from '~/shared/constants';

export const ProtectedRoutes: RouteObject = {
  element: <AuthRouter />,
  children: [
    {
      element: <HomeRouter />,
      loader: fetchJoinedRoom,
      hydrateFallbackElement: <LoadingPage />,
      children: [
        {
          element: <DefaultPage />,
          path: PATH.DEFAULT,
        },
      ],
    },
    HomeRoutes,
  ],
};
