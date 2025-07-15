import { useMutation } from '@tanstack/react-query';
import { REQUEST, userPost } from '~/shared/api';

const submitProjectInvitation = async (
  inviteEmails: string[],
  projectId: number,
) => {
  const promises = inviteEmails.map(async (email) => {
    try {
      const response = await userPost<{ email: string; projectId: number }>({
        request: REQUEST.INVITE_PROJECT,
        data: {
          email,
          projectId,
        },
      });
      return { email, success: true, response };
    } catch (error) {
      return { email, success: false, error };
    }
  });

  const results = await Promise.all(promises);

  const successfulResults = results.filter((r) => r.success);
  const failedResults = results.filter((r) => !r.success);

  return {
    success: successfulResults.length,
    failed: failedResults.length,
    total: inviteEmails.length,
    results,
    allSuccessful: failedResults.length === 0,
  };
};

export const useSubmitProjectInvitation = () => {
  return useMutation({
    mutationFn: (data: { inviteEmails: string[]; projectId: number }) =>
      submitProjectInvitation(data.inviteEmails, data.projectId),
  });
};
