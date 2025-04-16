import React from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import { PATH } from '~/shared/constants';
import { getPath } from '~/shared/utils';

export default function HomePage() {
  const data = useLoaderData();

  return (
    <>
      {data.length > 0 ? (
        <Navigate to={getPath(PATH.PROJECT, data.data[0].projectId)} />
      ) : (
        <Navigate to={PATH.DEFAULT} />
      )}
    </>
  );
}
