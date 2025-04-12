import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkLoginStatus } from '~/shared/utils';

export default function AuthRouter() {
  return checkLoginStatus() ? (
    <Suspense>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
}
