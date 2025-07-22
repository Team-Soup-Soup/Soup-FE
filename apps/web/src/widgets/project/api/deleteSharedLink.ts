import { useMutation } from '@tanstack/react-query';
import { REQUEST, userDelete } from '~/shared/api';
import { getPath } from '~/shared/utils';

const deleteSharedLink = async ({
  linkId,
  projectId,
}: {
  linkId: number;
  projectId: number;
}) => {
  const response = await userDelete({
    request:
      getPath(REQUEST.SHARE_LINK, linkId.toString()) +
      '?projectId=' +
      projectId,
  });
  return response.data;
};

export const useDeleteSharedLink = () => {
  return useMutation({
    mutationFn: deleteSharedLink,
  });
};
