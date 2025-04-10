import { get, post, REQUEST } from '~/shared/api';
import { SignupInfo } from '../types';

interface IdValidationResponse {
  result: boolean;
  resultDesc: string;
}

interface IdValidationParams {
  userId: string;
}

interface EmailCodeRequest {
  email: string;
}

interface EmailCodeValidationRequest {
  authId: number;
  authCode: string;
}

export const fetchIdValidation = async (id: string) => {
  const response = await get<IdValidationResponse, IdValidationParams>({
    request: REQUEST.CHECK_VALID_ID,
    params: { userId: id },
  });
  return response.data.result;
};

export const fetchEmailCode = async (email: string) => {
  const response = await post<EmailCodeRequest>({
    request: REQUEST.SEND_EMAIL_CODE,
    data: { email: email },
  });
  return response.data;
};

export const fetchEmailCodeValidation = async (
  authId: number,
  authCode: string,
) => {
  const response = await post<EmailCodeValidationRequest>({
    request: REQUEST.CHECK_VALID_EMAIL_CODE,
    data: { authId: authId, authCode: authCode },
  });
  return response.status === 200;
};

export const fetchUserJoin = async (data: SignupInfo) => {
  const response = await post<SignupInfo>({
    request: REQUEST.SIGNUP,
    data: data,
  });
  return response.status;
};
