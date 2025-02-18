import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLoginStatus } from '~/shared';

export default function AuthRouter() {
  return useLoginStatus() ? <Outlet /> : <Navigate to="/login" />;
}
