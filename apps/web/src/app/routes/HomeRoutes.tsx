import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

import { HomeLayout } from '~/app/layouts';
import { PATH } from '~/shared/constants';
import { ProjectBoardRoutes } from '~/app/routes/ProjectBoardRoutes';
import { fetchJoinedRoom, getDate } from '~/shared/utils';
import { LoadingPage } from '~/shared/ui';
import { HomePage } from '~/pages/home/ui';
import { fetchSchedule } from '~/shared/utils/fetchSchedule';

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
      index: true,
      loader: fetchJoinedRoom,
      hydrateFallbackElement: <LoadingPage />,
      element: <HomePage />,
    },
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
          loader: ({ params }) => {
            const { projectId } = params;
            return fetchSchedule(
              projectId!,
              getDate(new Date().toISOString(), 'YYYY-MM'),
            );
          },
          hydrateFallbackElement: <LoadingPage />,
          path: PATH.SCHEDULE,
          element: <SchedulePage />,
        },
        ProjectBoardRoutes,
      ],
    },
  ],
};
