import React, { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LOCATION } from '~/shared/constants/location';
import { LocationKey } from '~/shared/types';

export default function Breadcrumb() {
  const location = useLocation();
  const currentLocation = location.pathname.split('/');
  const { projectId } = useParams();

  let locationParts = useMemo(() => {
    const currentLocation = location.pathname.split('/');
    return currentLocation
      .slice(1)
      .map((path) =>
        path.includes('%') ? decodeURIComponent(path) : path,
      ) as LocationKey[];
  }, [location.pathname]);

  if (locationParts.length === 0) return null;
  locationParts = locationParts.filter((location) => location !== projectId);

  return (
    <div className="fixed top-0 z-20 w-full bg-white px-8 py-5">
      <div className="text-light flex items-center gap-x-2">
        {locationParts.map((path, index) => {
          if (path === projectId) return;
          const isLastItem = index === locationParts.length - 1;
          const url = currentLocation.slice(0, 3 + index).join('/');

          return (
            <React.Fragment key={path}>
              <LocationButton name={path} url={url} isActive={isLastItem} />
              {!isLastItem && <span>/</span>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

interface LocationButtonProps {
  name: LocationKey;
  url: string;
  isActive?: boolean;
}

const LocationButton = ({ name, url }: LocationButtonProps) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(url);
  };

  return (
    <button
      className={
        'hover:text-dark hover:bg-main-board-border/30 cursor-pointer rounded-md p-1 px-2 transition duration-100 ease-in-out'
      }
      onClick={handleClick}
    >
      {LOCATION[name]}
    </button>
  );
};
