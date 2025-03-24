import { MODAL, PROFILE_LEVEL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import React, { useState } from 'react';
import { Button, Select } from '@soup/design-system';
import { userList } from '~/mocks';

export default function LeaveProjectModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.LEVEL_PROJECT });
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const defaultValue = { name: '멤버 선택' };
  const myProfile = userList[1];
  const selectMemberList = userList.map((member) => ({
    name: member.name,
    image: member.profile,
  }));

  const handleLeaveProject = () => {
    closeModal(MODAL.LEVEL_PROJECT);
  };

  return (
    isOpen && (
      <Modal modalKey={MODAL.LOGOUT} className="w-[600px]">
        <Modal.Header title="프로젝트 나가기" />
        <Modal.Body className="mt-2 flex flex-col gap-[50px]">
          {myProfile.level === PROFILE_LEVEL.MASTER ? (
            <>
              <div className="flex flex-col gap-[4px]">
                <p className="font-light text-black">
                  마스터 등급을 양도할 멤버를 선택해주세요.
                </p>
                <p className="text-light text-sm font-light">
                  마스터 등급은 프로젝트 생성자의 권한입니다.
                  <br /> 프로젝트를 떠나시기 전, 다음 권위자를 지목해주세요
                </p>
              </div>
              <Select
                className="w-[258px]"
                initValue={defaultValue}
                options={selectMemberList}
                onChangeValue={(value) => setSelectedMember(value)}
              >
                <option value="멤버 선택" className="text-light" disabled />
              </Select>
            </>
          ) : (
            <p className="text-dark">정말 해당 프로젝트를 나가시겠습니까?</p>
          )}
        </Modal.Body>
        <Modal.Footer className="mb-2 flex justify-end gap-4">
          {myProfile.level === PROFILE_LEVEL.MASTER ? (
            <Button
              className="mt-18 w-[100px]"
              color="normal"
              locked={!selectedMember}
              onClick={() => closeModal(MODAL.LEVEL_PROJECT)}
            >
              나가기
            </Button>
          ) : (
            <>
              <Button
                className="w-[100px]"
                color="normal"
                onClick={handleLeaveProject}
              >
                네
              </Button>
              <Button
                className="w-[100px]"
                color="normal"
                onClick={() => closeModal(MODAL.LEVEL_PROJECT)}
              >
                아니요
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    )
  );
}
