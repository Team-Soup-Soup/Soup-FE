import { useForm } from 'react-hook-form';
import React, { useCallback, useImperativeHandle } from 'react';
import type { AlarmSettingItem } from '~/shared/types';
import ToggleController from './ToggleController';

interface AlarmSettingProps {
  ref: React.Ref<{
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    isValid: boolean;
  }>;
}

export default function AlarmSetting({ ref }: AlarmSettingProps) {
  const {
    handleSubmit,
    formState: { isValid },
    control,
    trigger,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      postComment: true,
      boardComment: false,
      boardQuestion: true,
      questionComment: true,
    },
  });

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit(onSubmit),
    isValid,
  }));

  const onSubmit = useCallback(
    async (data: AlarmSettingItem) => {
      const isValidForm = await trigger();

      if (isValidForm) {
        console.log(data);
      }
    },
    [trigger],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[62px]">
        <div>
          <p className="text-light mb-2 flex items-center gap-[10px] text-sm font-light">
            멘션 알림은 해제할 수 없습니다.
          </p>
          <div className="bg-lock h-[290px] w-full rounded-[10px]">
            <div className="flex flex-col gap-[24px] rounded-[10px] p-[30px]">
              <div className="flex flex-col gap-[4px]">
                <label className="text-light text-sm">내 게시글</label>
                <ToggleController
                  label="댓글 알림"
                  name="postComment"
                  id="postComment"
                  control={control}
                />
              </div>
              <div className="flex flex-col gap-[4px]">
                <label className="text-light text-sm">내 보드</label>
                <ToggleController
                  label="댓글 알림"
                  name="boardComment"
                  id="boardComment"
                  control={control}
                />
                <ToggleController
                  label="질문 알림"
                  name="boardQuestion"
                  id="boardQuestion"
                  control={control}
                />
              </div>
              <div className="flex flex-col gap-[4px]">
                <label className="text-light text-sm">내 질문</label>
                <ToggleController
                  label="답글 알림"
                  name="questionComment"
                  id="questionComment"
                  control={control}
                />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="hidden" disabled={!isValid} />
      </div>
    </form>
  );
}
