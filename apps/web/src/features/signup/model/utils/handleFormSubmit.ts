import { type SignupInfo } from '~/features/signup/types';

export const handleFormSubmit = (data: SignupInfo) => {
  console.log(data);
};

export const handleButtonSubmit = (target: string) => {
  console.log(target);
};
