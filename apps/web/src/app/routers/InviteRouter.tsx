import React from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useFetchProjectJoin } from '~/features/project/api';
import { PATH } from '~/shared/constants';
import { getCookie } from '~/shared/utils';

export default function InviteRouter() {
  const [searchParams] = useSearchParams();
  const signature = searchParams.get('signature');
  const accessToken = getCookie('ACCESS_TOKEN');
  const { refetch: fetchProjectJoin } = useFetchProjectJoin();

  if (!signature) {
    return <Navigate to={PATH.HOME} />;
  }

  if (accessToken && signature) {
    fetchProjectJoin();
  }

  return <Outlet />;
}
