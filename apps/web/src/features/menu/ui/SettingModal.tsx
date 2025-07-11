import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@soup/utils';
import { Button } from '@soup/design-system';

import { Modal } from '~/shared/ui';
import { MODAL, SETTING_ITEM } from '~/shared/constants';
import { useModalState } from '~/shared/hooks';
import type { ModalRef, SettingItem } from '~/shared/types';
import ProfileSetting from './ProfileSetting';
import AlarmSetting from './AlarmSetting';
import WithdrawSetting from './WithdrawSetting';
import PasswordSetting from './PasswordSetting';

export default function SettingModal() {
  const { isOpen: openSetting } = useModalState({ key: MODAL.SETTING });

  const [view, setView] = useState<SettingItem>(SETTING_ITEM.PROFILE);

  const profileRef = useRef<ModalRef>(null);
  const passwordRef = useRef<ModalRef>(null);
  const securityRef = useRef<ModalRef>(null);

  const handleSaveButtonClick = async () => {
    if (view === SETTING_ITEM.PROFILE) {
      profileRef.current?.handleSubmit();
    } else if (view === SETTING_ITEM.PASSWORD) {
      passwordRef.current?.handleSubmit();
    } else if (view === SETTING_ITEM.ALARM) {
      securityRef.current?.handleSubmit();
    }
  };

  const render = {
    [SETTING_ITEM.PROFILE]: <ProfileSetting ref={profileRef} />,
    [SETTING_ITEM.PASSWORD]: <PasswordSetting ref={passwordRef} />,
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
      <Modal size="lg" modalKey={MODAL.SETTING}>
        <Modal.Header
          title={view === SETTING_ITEM.WITHDRAW ? '회원탈퇴' : '설정'}
        >
          {view !== SETTING_ITEM.WITHDRAW && (
            <ul className="mb-[32px] flex gap-[32px]">
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
        <Modal.Body className="size-full justify-between font-light">
          <div className="w-[520px]">{render[view]}</div>
          {view !== SETTING_ITEM.WITHDRAW && (
            <Modal.Footer className="justify-between">
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
        </Modal.Body>
      </Modal>
    )
  );
}
