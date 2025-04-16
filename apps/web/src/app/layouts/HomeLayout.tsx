import { Outlet } from 'react-router-dom';
import { Sidebar } from '~/widgets/menu/ui';

export default function HomeLayout(): React.ReactElement {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="scrollbar-hide flex w-full justify-center overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
}
