import { type RouteObject } from 'react-router-dom';
import { ErrorPage } from '~/pages/error/ui';

import {
  ProjectBoardPage,
  ProjectBoardPostPage,
  ProjectBoardSearchPage,
} from '~/pages/project/ui';
import { PATH } from '~/shared/constants';

export const ProjectBoardRoutes: RouteObject = {
  path: PATH.BOARD,
  errorElement: <ErrorPage />,
  children: [
    { index: true, element: <ProjectBoardPage /> },
    {
      path: PATH.POST_DETAIL,
      element: <ProjectBoardPostPage />,
    },
    { path: PATH.SEARCH, element: <ProjectBoardSearchPage /> },
  ],
};
