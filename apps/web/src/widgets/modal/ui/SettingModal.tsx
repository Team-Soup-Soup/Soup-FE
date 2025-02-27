import { MODAL, SETTING_ITEM } from '~/shared/constants';
import { useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import React, { useState } from 'react';
import { cn } from '@soup/utils';
import { Button } from '@soup/design-system';
import { ProfileSetting, SecuritySetting } from './setting';

export default function SettingModal() {
  const { isOpen } = useModalState({ key: MODAL.SETTING });

  const [view, setView] = useState(SETTING_ITEM.PROFILE);
  const [isClickedSaveButton, setIsClickedSaveButton] = useState({
    [SETTING_ITEM.PROFILE]: false,
    [SETTING_ITEM.SECURITY]: false,
  });

  const handleSaveButtonClick = (state: boolean) => {
    setIsClickedSaveButton((prev) => ({
      ...prev,
      [view]: state,
    }));
  };

  const render = {
    [SETTING_ITEM.PROFILE]: (
      <ProfileSetting
        isClickedSaveButton={isClickedSaveButton[view]}
        setIsClickedSaveButton={handleSaveButtonClick}
      />
    ),
    [SETTING_ITEM.SECURITY]: (
      <SecuritySetting
        isClickedSaveButton={isClickedSaveButton[view]}
        setIsClickedSaveButton={handleSaveButtonClick}
      />
    ),
  };

  return (
    isOpen && (
      <Modal modalKey={MODAL.SETTING}>
        <Modal.Header title="설정">
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
        </Modal.Header>
        <Modal.Body className="font-light">
          <div className="w-[520px]">{render[view]}</div>
        </Modal.Body>
        <Modal.Footer className="mt-20 justify-between">
          <button className="text-light text-sm font-light hover:cursor-pointer">
            회원탈퇴하기
          </button>
          <Button
            size="lg"
            color="normal"
            onClick={() => handleSaveButtonClick(true)}
          >
            저장하기
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
