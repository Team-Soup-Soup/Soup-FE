import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { fetchLoginStatus } from '~/shared/utils';

export default function AuthRouter() {
  return fetchLoginStatus() ? <Outlet /> : <Navigate to="/login" />;
}
