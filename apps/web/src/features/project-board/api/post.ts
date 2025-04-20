import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { BOARD_REQUEST, userDelete } from '~/shared/api';
import { getPath } from '~/shared/utils';
import { useFetchProjectBoardList } from '~/widgets/project/api';

const deletePost = async (postId: string) => {
  console.log(`deletePost postId: ${postId}`);
  await userDelete({
    request: getPath(BOARD_REQUEST.POST, postId),
    params: { id: postId },
  });
};
export const useDeletePost = () => {
  const { projectId } = useParams();
  const { refetch } = useFetchProjectBoardList({ projectId: projectId! });

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      refetch();
      console.log('게시글 삭제 성공'); /**정상작동 테스트용 */
    },
  });
};
