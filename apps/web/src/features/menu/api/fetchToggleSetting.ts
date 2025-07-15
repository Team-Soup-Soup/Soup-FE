import { useQuery } from '@tanstack/react-query';
import { REQUEST, userGet } from '~/shared/api';
import { setCookie } from '~/shared/utils';
import { ToggleSetting } from '../types';

const fetchToggleSetting = async () => {
  const response = await userGet<ToggleSetting>({
    request: REQUEST.FETCH_TOGGLE_SETTING,
  });
  return response.data;
};

export const useFetchToggleSetting = () => {
  return useQuery({
    queryKey: ['toggleSetting'],
    queryFn: fetchToggleSetting,
    enabled: false,
    select: (data) => setCookie('toggleSetting', JSON.stringify(data)),
  });
};
