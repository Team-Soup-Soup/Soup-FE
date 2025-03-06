import { type RouteObject } from 'react-router-dom';

import { HomeLayout } from '~/app/layouts';
import { HomePage } from '~/pages/home/ui';
import {
  ProjectBoardPage,
  ProjectBoardPostPage,
  ProjectPage,
} from '~/pages/project/ui';
import { PATH } from '~/shared/constants';

export const HomeRoutes: RouteObject = {
  element: <HomeLayout />,
  children: [
    { path: PATH.HOME, element: <HomePage /> },
    {
      path: PATH.PROJECT_CONTENT,
      element: <ProjectPage />,
    },
    { path: PATH.BOARD, element: <ProjectBoardPage /> },
    { path: PATH.POST_DETAIL, element: <ProjectBoardPostPage /> },
  ],
};
