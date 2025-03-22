import { Button, Select } from '@soup/design-system';
import React, { useState } from 'react';
import { userList } from '~/mocks';
import { MODAL, PROFILE_LEVEL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import type { ProfileItem, ProfileLevel, UserOptionItem } from '~/shared/types';
import { Modal, Profile } from '~/shared/ui';
import { getKoreanLevel } from '~/shared/utils';
import ExpulsionProjectModal from './ExpulsionProjectModal';
import LevelInfoModal from './LevelInfoModal';

interface MemberListByLevelProps {
  level: ProfileLevel;
  memberList: Array<ProfileItem>;
}

export default function ProjectMemberManageModal() {
  const { openModal, closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.MANAGE_MEMBER });

  const masterList = userList.filter(
    (user) => user.level === PROFILE_LEVEL.MASTER,
  ) as Array<ProfileItem>;
  const subMasterList = userList.filter(
    (user) => user.level === PROFILE_LEVEL.SUB_MASTER,
  ) as Array<ProfileItem>;
  const classicList = userList.filter(
    (user) => user.level === PROFILE_LEVEL.CLASSIC,
  ) as Array<ProfileItem>;

  const handleSaveButton = () => {
    closeModal(MODAL.MANAGE_MEMBER);
  };

  return (
    isOpen && (
      <>
        <Modal modalKey={MODAL.MANAGE_MEMBER} className="w-[600px]">
          <Modal.Header title="멤버별 편집" />
          <Modal.Body className="justify-between">
            <div className="scrollbar-hide flex h-[516px] flex-col gap-[30px] overflow-y-scroll">
              <MemberListByLevel
                level={PROFILE_LEVEL.MASTER}
                memberList={masterList}
              />
              <MemberListByLevel
                level={PROFILE_LEVEL.SUB_MASTER}
                memberList={subMasterList}
              />
              <MemberListByLevel
                level={PROFILE_LEVEL.CLASSIC}
                memberList={classicList}
              />
            </div>
            <div className="text-light text-sm font-light">
              [참고사항] <br />
              - 퇴출 당해도 계속 초대받을 수 있습니다
              <br />- 마스터 권한은 마스터의 이탈로 인한 양도만 가능합니다.
            </div>
          </Modal.Body>
          <Modal.Footer className="mt-[36px] justify-between">
            <button
              type="button"
              className="text-light hover:text-dark text-sm font-light hover:cursor-pointer"
              onClick={() => openModal(MODAL.LEVEL_INFO)}
            >
              권한별 제한 보기
            </button>
            <Button color="normal" onClick={handleSaveButton}>
              저장하기
            </Button>
          </Modal.Footer>
        </Modal>
        <LevelInfoModal />
      </>
    )
  );
}

const MemberListByLevel = ({ level, memberList }: MemberListByLevelProps) => {
  const { openModal } = useModal();
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const levelOption = Object.values(PROFILE_LEVEL).reduce(
    (acc: Array<UserOptionItem>, level) => {
      acc.push({ name: getKoreanLevel(level) });
      return acc;
    },
    [],
  );

  const handleExpulsion = (name: string) => {
    setSelectedMember(name);
    openModal(MODAL.EXPULSION_PROJECT);
  };

  return (
    <>
      <div className="flex flex-col gap-[8px]">
        <div>{getKoreanLevel(level)}</div>
        <div className="flex flex-col gap-[12px]">
          {memberList.length > 0 ? (
            memberList.map(({ name, profile, level }) => (
              <div className="flex h-[42px] justify-between">
                <Profile image={profile} name={name} />
                <div className="flex h-[40px] w-full justify-end gap-[8px]">
                  <Select
                    options={levelOption}
                    value={selectedLevel}
                    disabled={level === PROFILE_LEVEL.MASTER}
                    boxContentClassName="h-[40px]"
                    initValue={{ name: getKoreanLevel(level) }}
                    onChangeValue={(value) => setSelectedLevel(value)}
                  />
                  {level !== PROFILE_LEVEL.MASTER && (
                    <Button
                      color="normal"
                      onClick={() => handleExpulsion(name)}
                    >
                      퇴출
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-light text-center text-sm font-light">
              {getKoreanLevel(level)}로 임명한 멤버가 없습니다
            </p>
          )}
        </div>
      </div>
      <ExpulsionProjectModal name={selectedMember} />
    </>
  );
};
