import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoadingPage } from '~/pages/loading/ui';
import { checkLoginStatus } from '~/shared/utils';

export default function AuthRouter() {
  return checkLoginStatus() ? (
    <Suspense fallback={<LoadingPage />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
}
