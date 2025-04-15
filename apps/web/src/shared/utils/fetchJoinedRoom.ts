import { REQUEST, userGet } from '~/shared/api';

type JoinedRoomResponse = JoinedRoom[];

interface JoinedRoom {
  projectId: number;
  projectName: string;
}

export const fetchJoinedRoom = async () => {
  const response = await userGet<JoinedRoomResponse>({
    request: REQUEST.FETCH_JOINED_PROJECT,
  });
  return { data: response.data, length: response.data.length };
};
