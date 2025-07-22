import { useMutation } from '@tanstack/react-query';
import { REQUEST, userPut } from '~/shared/api';

const updateSharedLink = async (data: FormData) => {
  const response = await userPut({
    request: REQUEST.SHARE_LINK,
    data: data,
  });
  return response.data;
};

export const useUpdateSharedLink = () => {
  return useMutation({
    mutationFn: updateSharedLink,
  });
};
