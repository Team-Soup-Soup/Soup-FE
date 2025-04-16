import { REQUEST, userPost } from '~/shared/api';

interface UserInvitationRequest {
  email: string;
  projectId: number;
}

export const submitUserInvitation = async (
  emails: string[],
  projectId: number,
) => {
  for (const email of emails) {
    await userPost<UserInvitationRequest>({
      request: REQUEST.INVITE_PROJECT,
      data: {
        email: email,
        projectId: projectId,
      },
    });
    console.log('success!');
  }
};
