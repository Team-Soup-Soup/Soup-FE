import { useLocation } from 'react-router-dom';

export const useProjectId = () => {
  const location = useLocation();
  const projectId = location.pathname.split('/')[2];
  return Number(projectId);
};
