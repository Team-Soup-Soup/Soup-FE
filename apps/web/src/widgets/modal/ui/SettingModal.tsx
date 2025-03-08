import { MODAL, SETTING_ITEM } from '~/shared/constants';
import { useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import React, { useRef, useState } from 'react';
import { cn } from '@soup/utils';
import { Button } from '@soup/design-system';
import { ProfileSetting, AlarmSetting, WithdrawSetting } from './setting';
import type { SettingItem } from '~/shared/types';

export default function SettingModal() {
  const { isOpen: openSetting } = useModalState({ key: MODAL.SETTING });

  const [view, setView] = useState<SettingItem>(SETTING_ITEM.PROFILE);

  const profileRef = useRef<{ handleSubmit: () => Promise<void> }>(null);
  const securityRef = useRef<{ handleSubmit: () => Promise<void> }>(null);

  const handleSaveButtonClick = () => {
    if (view === SETTING_ITEM.PROFILE) {
      profileRef.current?.handleSubmit();
    } else if (view === SETTING_ITEM.ALARM) {
      securityRef.current?.handleSubmit();
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
      <Modal modalKey={MODAL.SETTING}>
        <Modal.Header
          title={view === SETTING_ITEM.WITHDRAW ? '회원탈퇴' : '설정'}
        >
          {view !== SETTING_ITEM.WITHDRAW && (
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
