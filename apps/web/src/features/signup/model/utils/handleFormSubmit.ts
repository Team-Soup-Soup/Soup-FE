import { type SignupInfo } from '~/features/signup/types';
import { fetchUserJoin } from '~/features/signup/api';

export const handleFormSubmit = async (data: SignupInfo) => {
  const response = await fetchUserJoin(data);
  if (response === 200) alert('success');
  else alert('fail');
};
