import { MODAL, PROFILE_MAX_LENGTH, SETTING_ITEM } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { cn } from '@soup/utils';
import { Button, Input, Toggle } from '@soup/design-system';
import { isValidName, isValidPassword } from '../utils';

const toggleInitialState = {
  postComment: true,
  boardComment: false,
  boardQuestion: true,
  questionComment: true,
};
const securityInitialState = {
  nowPassword: '',
  newPassword: '',
};

export default function SettingModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.SETTING });

  const [view, setView] = useState(SETTING_ITEM.PROFILE);

  const [name, setName] = useState('홍길동');
  const [image, setImage] = useState('/images/user_profile.webp');
  const [isValidSave, setIsValidSave] = useState(true);
  const [profileToggleValues, setProfileToggleValues] =
    useState<Record<string, boolean>>(toggleInitialState);

  const [securityInputValue, setSecurityInputValues] =
    useState<Record<string, string>>(securityInitialState);

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleToggleClick = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileToggleValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };
  const handleSecurityInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecurityInputValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    let isValid = false;
    switch (view) {
      case SETTING_ITEM.PROFILE:
        isValid = isValidName(name);
        break;
      case SETTING_ITEM.SECURITY:
        isValid = isValidPassword(
          securityInputValue.nowPassword,
          securityInputValue.newPassword,
        );
        break;
    }
    setIsValidSave(isValid);
  }, [
    name,
    isValidSave,
    securityInputValue.nowPassword,
    securityInputValue.newPassword,
    view,
  ]);

  const render = {
    [SETTING_ITEM.PROFILE]: (
      <>
        <div className="flex flex-col gap-[42px]">
          <div className="flex items-center gap-[32px]">
            <label htmlFor="file">
              <input
                id="file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageInputChange}
              />
              <img
                id="file"
                src={image}
                alt="프로필"
                width={120}
                height={120}
                className="rounded-full"
              />
            </label>
            <p className="font-light">프로필 변경하기</p>
          </div>
          <Input
            label="이름"
            value={name}
            onChange={handleNameInputChange}
            maxLength={PROFILE_MAX_LENGTH.NAME}
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
                      checked={profileToggleValues.postComment}
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
                      checked={profileToggleValues.boardComment}
                      onChange={handleToggleClick}
                    />
                  </div>
                  <div className="text-md flex w-full justify-between">
                    <p>질문 알림</p>
                    <Toggle
                      id="boardQuestion"
                      name="boardQuestion"
                      checked={profileToggleValues.boardQuestion}
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
                      checked={profileToggleValues.questionComment}
                      onChange={handleToggleClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
    [SETTING_ITEM.SECURITY]: (
      <>
        <div className="flex flex-col gap-[62px]">
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="id">아이디</label>
            <p
              id="id"
              className="border-main-board-border text-light bg-main-board size-full rounded-[10px] border p-[10px] font-light"
            >
              honggildong2004
            </p>
          </div>
          <div className="flex flex-col gap-[30px]">
            <Input
              id="nowPassword"
              name="nowPassword"
              label="현재 비밀번호"
              type="password"
              value={securityInputValue.nowPassword}
              onChange={handleSecurityInputChange}
              placeholder="현재 비밀번호를 입력해주세요"
            />
            <div className="flex flex-col gap-[8px]">
              <Input
                id="newPassword"
                name="newPassword"
                label="새 비밀번호"
                type="password"
                value={securityInputValue.newPassword}
                onChange={handleSecurityInputChange}
                placeholder="새 비밀번호를 입력해주세요"
              />
              <p className="text-light text-sm font-light">
                영어 + 특수문자 + 숫자 조합으로 최소 8자
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  };

  return (
    isOpen && (
      <Modal modalKey={MODAL.SETTING}>
        <Modal.Header title="설정" />
        <Modal.Body className="font-light">
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
        <Modal.Footer className="mt-20 justify-between">
          <button className="text-light text-sm font-light hover:cursor-pointer">
            회원탈퇴하기
          </button>
          <Button
            size="lg"
            color="normal"
            onClick={() => closeModal(MODAL.SETTING)}
            locked={!isValidSave}
          >
            저장하기
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
