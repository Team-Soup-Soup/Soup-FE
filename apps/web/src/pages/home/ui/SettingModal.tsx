import { MODAL, PROFILE_MAX_LENGTH, SETTING_ITEM } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { cn } from '@soup/utils';
import { Button, Input, Toggle } from '@soup/design-system';

const initialState = {
  postComment: true,
  boardComment: false,
  boardQuestion: true,
  questionComment: true,
};

export default function SettingModal() {
  const { closeModal } = useModal({ key: MODAL.SETTING });
  const { isOpen } = useModalState({ key: MODAL.SETTING });
  const [view, setView] = useState(SETTING_ITEM.PROFILE);
  const [name, setName] = useState('홍길동');
  const [isValidName, setValidName] = useState(true);
  const [toggleValues, setToggleValues] =
    useState<Record<string, boolean>>(initialState);

  const handleToggleClick = (e: ChangeEvent<HTMLInputElement>) => {
    setToggleValues((prev) => ({
      ...prev,
      [e.target.name]: !prev[e.target.name],
    }));
  };

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    const isValid = name.length > 0 && name.length <= PROFILE_MAX_LENGTH.NAME;
    setValidName(isValid);
  }, [name, isValidName]);

  const render = {
    [SETTING_ITEM.PROFILE]: (
      <>
        <div className="flex flex-col gap-[42px]">
          <div className="flex items-center gap-[32px]">
            <img
              src="/images/EmptyProject.webp"
              alt="프로필"
              width={120}
              height={120}
              className="rounded-full"
            />
            <p className="font-light">프로필 변경하기</p>
          </div>
          <Input
            label="이름"
            value={name}
            onChange={handleNameInputChange}
            length={`${name.length}/${PROFILE_MAX_LENGTH.NAME}자`}
            inputClassName="bg-lock border-none text-md px-[30px]"
            placeholder="이름을 입력해주세요"
          />
          <div>
            <p className="text-md mb-2 flex items-center gap-[10px] font-light">
              알림 설정
              <span className="text-light text-sm">
                멘션 알림은 해제할 수 없습니다.
              </span>
            </p>
            <div className="bg-lock h-[290px] w-full rounded-[10px]">
              <div className="flex flex-col gap-[24px] rounded-[10px] p-[30px]">
                <div className="flex flex-col gap-[4px]">
                  <label className="text-light text-sm">내 게시글</label>
                  <div className="text-md flex w-full justify-between">
                    <p>댓글 알림</p>
                    <Toggle
                      id="postComment"
                      name="postComment"
                      checked={toggleValues.postComment}
                      onChange={handleToggleClick}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <label className="text-light text-sm">내 보드</label>
                  <div className="text-md flex w-full justify-between">
                    <p>댓글 알림</p>
                    <Toggle
                      id="boardComment"
                      name="boardComment"
                      checked={toggleValues.boardComment}
                      onChange={handleToggleClick}
                    />
                  </div>
                  <div className="text-md flex w-full justify-between">
                    <p>질문 알림</p>
                    <Toggle
                      id="boardQuestion"
                      name="boardQuestion"
                      checked={toggleValues.boardQuestion}
                      onChange={handleToggleClick}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <label className="text-light text-sm">내 질문</label>
                  <div className="text-md flex w-full justify-between">
                    <p>답글 알림</p>
                    <Toggle
                      id="questionComment"
                      name="questionComment"
                      checked={toggleValues.questionComment}
                      onChange={handleToggleClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 flex justify-between">
          <button className="text-light text-sm font-light hover:cursor-pointer">
            회원탈퇴하기
          </button>
          <Button
            size="lg"
            color="normal"
            onClick={closeModal}
            locked={!isValidName}
          >
            저장하기
          </Button>
        </div>
      </>
    ),
  };

  return (
    isOpen && (
      <Modal title="설정" closeModal={closeModal}>
        <Modal.Body className="text-dark font-light">
          <ul className="mb-16 flex gap-[32px]">
            {Object.values(SETTING_ITEM).map((item) => (
              <li
                key={item}
                className={cn(
                  'text-light hover:cursor-pointer',
                  item === view &&
                    'text-dark decoration-lock-dark rounded-lg underline underline-offset-8',
                )}
                onClick={() => setView(item)}
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="w-[520px]">{render[view]}</div>
        </Modal.Body>
      </Modal>
    )
  );
}
