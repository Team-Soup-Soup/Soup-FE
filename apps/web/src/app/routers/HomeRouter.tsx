import React from 'react';

import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

import { PATH } from '~/shared/constants';

export default function HomeRouter() {
  const data = useLoaderData();

  return (
    <>{data && data.length > 0 ? <Outlet /> : <Navigate to={PATH.DEFAULT} />}</>
  );
}
