import { Outlet } from 'react-router-dom';
import { Sidebar } from '~/widgets/menu';

export default function HomeLayout(): React.ReactElement {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex w-full justify-center">
        <Outlet />
      </div>
    </div>
  );
}
