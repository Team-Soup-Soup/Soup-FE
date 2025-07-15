import { RouteObject } from 'react-router-dom';

import { InviteRouter } from '~/app/routers';
import { InvitePage } from '~/pages/invite/ui';
import { PATH } from '~/shared/constants';

export const InviteRoute: RouteObject = {
  element: <InviteRouter />,
  children: [
    {
      path: PATH.INVITE,
      element: <InvitePage />,
    },
  ],
};
