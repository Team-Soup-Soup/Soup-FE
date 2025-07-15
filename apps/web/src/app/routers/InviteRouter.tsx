import React from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { PATH } from '~/shared/constants';

export default function InviteRouter() {
  const [searchParams] = useSearchParams();
  const signature = searchParams.get('signature');

  if (!signature) {
    return <Navigate to={PATH.HOME} />;
  }

  return <Outlet />;
}
