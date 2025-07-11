import { useMutation } from '@tanstack/react-query';
import { REQUEST, userPut } from '~/shared/api';

const submitNewPassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  const response = await userPut({
    request: REQUEST.CHANGE_PASSWORD,
    data: {
      currentPassword: currentPassword,
      newPassword: newPassword,
    },
  });
  return response.data;
};

export const useSubmitNewPassword = () => {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      submitNewPassword(data.currentPassword, data.newPassword),
    onSuccess: () => {
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.success(
          '[비밀번호 변경] 변경된 정보로 업데이트 되었습니다.',
        );
      }
    },
  });
};
