import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

import { HomeLayout } from '~/app/layouts';
import { PATH } from '~/shared/constants';
import { ProjectBoardRoutes } from '~/app/routes/ProjectBoardRoutes';

const ProjectPage = lazy(() => import('~/pages/project/ui/ProjectPage'));
const SchedulePage = lazy(() => import('~/pages/schedule/ui/SchedulePage'));
const GroupBoardPage = lazy(
  () => import('~/pages/group-board/ui/GroupBoardPage'),
);

export const HomeRoutes: RouteObject = {
  element: <HomeLayout />,
  path: PATH.HOME,
  children: [
    {
      path: PATH.PROJECT_CONTENT,
      children: [
        {
          index: true,
          element: <ProjectPage />,
        },
        {
          path: PATH.GROUP_BOARD,
          element: <GroupBoardPage />,
        },
        {
          path: PATH.SCHEDULE,
          element: <SchedulePage />,
        },
        ProjectBoardRoutes,
      ],
    },
  ],
};
