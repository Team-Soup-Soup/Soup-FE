import { useMutation } from '@tanstack/react-query';
import { REQUEST, userPut } from '~/shared/api';
import type { ToggleSetting } from '../types';
import { useFetchToggleSetting } from './fetchToggleSetting';

const updateToggleSetting = async (data: ToggleSetting) => {
  const response = await userPut({
    request: REQUEST.UPDATE_TOGGLE_SETTING,
    data: data,
  });
  return response.data;
};

export const useUpdateToggleSetting = () => {
  const { refetch } = useFetchToggleSetting();

  return useMutation({
    mutationFn: updateToggleSetting,
    onSuccess: () => {
      refetch();
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.success('[알림 설정] 알림 설정이 변경되었습니다.');
      }
    },
  });
};
