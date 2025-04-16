import React, { useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';

export default function HomeRouter() {
  const data = useLoaderData();

  useEffect(() => {
    if (data && data.length !== 0) {
      window.history.back();
    }
  }, []);

  return <Outlet />;
}
