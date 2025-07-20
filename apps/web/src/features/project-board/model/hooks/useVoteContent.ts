import { useState } from 'react';
import { useSubmitVoteOption, useSubmitVoteParticipation } from '../../api';
import { VotePost } from '~/shared/types';

export default function useVoteContent({ voteId }: Pick<VotePost, 'voteId'>) {
  const [option, setOption] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<number[]>([]);
  const [addOption, setAddOption] = useState<boolean>(false);

  const { mutate: postOption } = useSubmitVoteOption();
  const { mutate: postVoteParticipation } = useSubmitVoteParticipation();

  const isChecked = (value: number) => selectedOption.includes(value);

  const handleAddOption = () => {
    setAddOption(true);
  };

  const handleCancel = () => {
    setOption('');
    setAddOption(false);
  };

  const handleConfirm = () => {
    postOption({ voteId: voteId, option: option });
    setOption('');
    setAddOption(false);
  };

  const handleSelectOption = (value: number) => {
    if (isChecked(value))
      setSelectedOption((prev) => prev.filter((option) => option !== value));
    else setSelectedOption((prev) => [...prev, value]);
  };

  const handleSubmitVote = () => {
    postVoteParticipation({ voteId: voteId, voteSeq: selectedOption[0] });
  };
  return {
    isChecked,
    handleAddOption,
    handleCancel,
    handleConfirm,
    handleSelectOption,
    handleSubmitVote,
    addOption,
    option,
    setOption,
    selectedOption,
  };
}
