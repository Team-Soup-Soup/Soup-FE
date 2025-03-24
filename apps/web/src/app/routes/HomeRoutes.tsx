import { type RouteObject } from 'react-router-dom';

import { HomeLayout } from '~/app/layouts';
import { ProjectBoardRoutes } from '~/app/routes/ProjectBoardRoutes';
import { HomePage } from '~/pages/home/ui';
import { ProjectPage } from '~/pages/project/ui';
import { SchedulePage } from '~/pages/schedule/ui';
import { PATH } from '~/shared/constants';

export const HomeRoutes: RouteObject = {
  element: <HomeLayout />,
  path: PATH.HOME,
  children: [
    { index: true, element: <HomePage /> },
    {
      path: PATH.PROJECT_CONTENT,
      children: [
        { index: true, element: <ProjectPage /> },
        ProjectBoardRoutes,
        { path: PATH.SCHEDULE, element: <SchedulePage /> },
      ],
    },
  ],
};
