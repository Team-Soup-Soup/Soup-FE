import { get, REQUEST } from '~/shared/api';

interface IdValidationResponse {
  result: boolean;
  resultDesc: string;
}

interface IdValidationParams {
  userId: string;
}

export const fetchIdValidation = async (id: string) => {
  const response = await get<IdValidationResponse, IdValidationParams>({
    request: REQUEST.CHECK_VALID_ID,
    params: { userId: id },
  });
  return response.data.result;
};
