import { REQUEST, userPost } from '~/shared/api';
import { CREATE_PROJECT_MAX_LENGTH, MODAL } from '~/shared/constants';
import { useModal } from '~/shared/hooks';

import { CreateProjectRequest } from '~/features/menu/types';
import { UseFormReset, UseFormWatch } from 'react-hook-form';

interface CreateProjectProps {
  reset: UseFormReset<CreateProjectRequest>;
  watch: UseFormWatch<CreateProjectRequest>;
  refetch: () => void;
}

export default function useCreateProject({
  reset,
  watch,
  refetch,
}: CreateProjectProps) {
  const { closeModal } = useModal();
  const { name, description } = watch();

  const isValidProject =
    name.length > 0 &&
    name.length <= CREATE_PROJECT_MAX_LENGTH.NAME &&
    description.length > 0 &&
    description.length <= CREATE_PROJECT_MAX_LENGTH.DESCRIPTION;

  const formSubmit = async (data: CreateProjectRequest) => {
    await userPost<CreateProjectRequest>({
      request: REQUEST.PROJECT,
      data: data,
    });

    closeModal(MODAL.CREATE_PROJECT);
    refetch();
    reset();
  };
  return { formSubmit, isValidProject };
}
