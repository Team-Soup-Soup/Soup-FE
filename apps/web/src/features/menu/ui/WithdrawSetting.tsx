import React, { useState } from 'react';
import { Button, Checkbox } from '@soup/design-system';
import { useModal } from '~/shared/hooks';
import { MODAL } from '~/shared/constants';

export default function WithdrawSetting() {
  const { closeModal } = useModal();
  const [agree, setAgree] = useState(false);

  const handleWithdrawButtonClick = () => {
    closeModal(MODAL.SETTING);
  };

  return (
    <div className="flex h-full flex-col items-center justify-between gap-8 font-light">
      <div className="mt-30 flex flex-col items-center gap-[32px] text-center">
        <img src="/images/withdraw_account.webp" alt="탈퇴 이미지" />
        <div>
          <p className="font-semibold">정말 회원탈퇴 하시겠습니까?</p>
          <p className="text-light">스프가 당신을 그리워할거에요.</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[30px]">
        <div className="text-start">
          <ol className="text-light">
            <li>· 회원탈퇴시 참여중인 모든 프로젝트는 자동으로 나가집니다.</li>
            <li>
              · 마스터 권한으로 보유중이던 프로젝트의 마스터 권한은
              <br />
              &nbsp;&nbsp;남아있는 다른 멤버들 중 랜덤으로 배정됩니다.
            </li>
            <li>
              · 실수로 회원탈퇴를 하더라도, 스프에게 책임을 물을 수 없습니다.
            </li>
          </ol>
        </div>
        <div className="flex w-full justify-between">
          <Checkbox
            labelClassName="text-light"
            label="위 모든 내용을 인지하였으며, 동의합니다."
            id="agree"
            checked={agree}
            onClick={() => setAgree(!agree)}
          />
          <Button
            size="lg"
            color="normal"
            onClick={handleWithdrawButtonClick}
            locked={!agree}
          >
            회원탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
}
