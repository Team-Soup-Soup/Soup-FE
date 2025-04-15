import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoadingPage } from '~/pages/loading/ui';
import { fetchLoginStatus } from '~/shared/utils';

export default function AuthRouter() {
  return fetchLoginStatus() ? (
    <Suspense fallback={<LoadingPage />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
}
