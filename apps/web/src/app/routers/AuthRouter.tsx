import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLoginStatus } from '~/shared/hooks';

export default function AuthRouter() {
  return useLoginStatus() ? (
    <Suspense>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
}
