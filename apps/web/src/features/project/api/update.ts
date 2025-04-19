import { REQUEST, userPut } from '~/shared/api';

interface UpdateProjectRequest {
  projectId: number;
  name: string;
  description: string;
}

export const updateProjectInfo = async (data: UpdateProjectRequest) => {
  await userPut<UpdateProjectRequest>({
    request: REQUEST.PROJECT,
    data: data,
  });
};
