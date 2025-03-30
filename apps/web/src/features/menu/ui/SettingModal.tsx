import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@soup/utils';
import { Button } from '@soup/design-system';

import { Modal } from '~/shared/ui';
import { MODAL, SETTING_ITEM } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import type { ModalRef, SettingItem } from '~/shared/types';
import ProfileSetting from './ProfileSetting';
import AlarmSetting from './AlarmSetting';
import WithdrawSetting from './WithdrawSetting';

export default function SettingModal() {
  const { isOpen: openSetting } = useModalState({ key: MODAL.SETTING });
  const { openModal, closeModal } = useModal();

  const [view, setView] = useState<SettingItem>(SETTING_ITEM.PROFILE);

  const profileRef = useRef<ModalRef>(null);
  const securityRef = useRef<ModalRef>(null);

  const handleSaveButtonClick = async () => {
    let isValid = false;

    if (view === SETTING_ITEM.PROFILE) {
      profileRef.current?.handleSubmit();
      isValid = profileRef.current?.isValid ?? false;
    } else if (view === SETTING_ITEM.ALARM) {
      securityRef.current?.handleSubmit();
      isValid = securityRef.current?.isValid ?? false;
    }

    if (isValid) {
      closeModal(MODAL.SETTING);
      openModal(MODAL.UPDATE);
    }
  };

  const render = {
    [SETTING_ITEM.PROFILE]: <ProfileSetting ref={profileRef} />,
    [SETTING_ITEM.ALARM]: <AlarmSetting ref={securityRef} />,
    [SETTING_ITEM.WITHDRAW]: <WithdrawSetting />,
  };

  useEffect(() => {
    if (!openSetting) {
      setView(SETTING_ITEM.PROFILE);
    }
  }, [openSetting]);

  return (
    openSetting && (
      <Modal size="md" modalKey={MODAL.SETTING}>
        <Modal.Header
          title={view === SETTING_ITEM.WITHDRAW ? '회원탈퇴' : '설정'}
        >
          {view !== SETTING_ITEM.WITHDRAW && (
            <ul className="mb-16 flex gap-[32px]">
              {Object.values(SETTING_ITEM)
                .filter((item) => item !== SETTING_ITEM.WITHDRAW)
                .map((item) => (
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
          )}
        </Modal.Header>
        <Modal.Body className="font-light">
          <div className="w-[520px]">{render[view]}</div>
        </Modal.Body>
        {view !== SETTING_ITEM.WITHDRAW && (
          <Modal.Footer className="mt-20 justify-between">
            <button
              className="text-light text-sm font-light hover:cursor-pointer"
              onClick={() => setView(SETTING_ITEM.WITHDRAW)}
            >
              회원탈퇴하기
            </button>
            <Button size="lg" color="normal" onClick={handleSaveButtonClick}>
              저장하기
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    )
  );
}
