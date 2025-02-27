import type { UserInfo } from '~/features/login/types';

export const useSubmit = ({ username, password }: UserInfo) => {
  alert(
    `id: ${username}\npw: ${password}\n\n로그인 요청되었습니다\n세부 구현 로직 차후 구현`,
  );
};
