import AuthPageImg from '~/assets/images/login-signup-image.png';
import { Outlet } from 'react-router-dom';

export default function AuthLayout(): React.ReactElement {
  return (
    <div className="grid min-h-screen grid-cols-1 xl:grid-cols-2">
      <div className="flex size-full justify-center py-20">
        <div className="border-dash-board-border w-170 rounded-auth box-shadow box-border h-full border-[1px]">
          <Outlet />
        </div>
      </div>
      <img
        src={AuthPageImg}
        className="hidden size-full bg-cover bg-center xl:block"
        loading="eager"
      />
    </div>
  );
}
