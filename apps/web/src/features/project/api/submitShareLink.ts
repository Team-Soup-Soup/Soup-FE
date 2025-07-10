import { useMutation } from '@tanstack/react-query';
import { REQUEST, userPost } from '~/shared/api';
import { useFetchShareLink } from './fetchShareLink';

const submitShareLink = async (data: FormData) => {
  const response = await userPost({
    request: REQUEST.SHARE_LINK,
    data: data,
  });
  return response.data;
};

export const useSubmitShareLink = (projectId: number) => {
  const { refetch } = useFetchShareLink(projectId);

  return useMutation({
    mutationFn: submitShareLink,
    onSuccess: () => refetch(),
  });
};
