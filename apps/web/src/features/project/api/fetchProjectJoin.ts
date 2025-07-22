import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { REQUEST, userGet } from '~/shared/api';
import { PATH } from '~/shared/constants';
import { getCookie } from '~/shared/utils';

type Invitation = {
  email: string;
  projectId: number;
  expiredAt: number;
  signature: string;
};

export const fetchProjectJoin = async () => {
  const { projectId, email, expiredAt, signature } = JSON.parse(
    decodeURIComponent(getCookie('invitation')!),
  ) as Invitation;

  const response = await userGet({
    request: REQUEST.JOIN_PROJECT,
    params: {
      projectId: projectId,
      email: email,
      expiredAt: expiredAt,
      signature: signature,
    },
  });

  return response.data;
};

export const useFetchProjectJoin = () => {
  const navigate = useNavigate();

  return useQuery({
    queryKey: ['fetchProjectJoin'],
    queryFn: fetchProjectJoin,
    enabled: false,
    select: () => navigate(PATH.HOME),
  });
};
