import { type RouteObject } from 'react-router-dom';

import { ProjectBoardPage, ProjectBoardPostPage } from '~/pages/project/ui';
import { PATH } from '~/shared/constants';

export const ProjectBoardRoutes: RouteObject = {
  path: PATH.BOARD,
  children: [
    { index: true, element: <ProjectBoardPage /> },
    {
      path: PATH.POST_DETAIL,
      element: <ProjectBoardPostPage />,
    },
  ],
};
