import React from 'react';

import { Button } from '@soup/design-system';

import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import { LevelTable, LevelTableBody, LevelTableHead } from './LevelTable';

export default function LevelInfoModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.LEVEL_INFO });

  const tableHeader = ['마스터, 서브 마스터', '클래식', '부가설명'];
  const tableBody = [
    { title: '멤버 초대', content: ['o', 'o'], description: '' },
    {
      title: '멤버 퇴출',
      content: ['△', 'o'],
      description: '멤버 퇴출은 마스터”만” 가능',
    },
    {
      title: '멤버 권한 부여',
      content: ['o', '△'],
      description: '멤버 별 등급을 매기는 것은 마스터”만” 가능',
    },
    { title: '게시글 생성', content: ['o', 'o'], description: '' },
    {
      title: '게시글 삭제',
      content: ['o', 'x'],
      description: '클래식 : 내 글도 삭제 X',
    },
    {
      title: '게시글 댓글 삭제',
      content: ['o', '△'],
      description: '클래식의 경우 내 댓글만 삭제 가능',
    },
    { title: '대시보드 생성', content: ['o', 'o'], description: '' },
    {
      title: '대시보드 수정',
      content: ['o', 'x'],
      description: '‘썸네일, 제목, 편집권한을 줄 클래식 멤버 선택 ‘ 권한',
    },
    { title: '대시보드 삭제', content: ['o', 'x'], description: '' },
    { title: '일정보드 추가', content: ['o', 'o'], description: '' },
    { title: '일정보드 수정/삭제', content: ['o', 'x'], description: '' },
    {
      title: '대시보드 내) 편집',
      content: ['o', 'o'],
      description: '클래식의 경우 락 걸린 프레임은 편집X',
    },
    {
      title: '대시보드 내) 프레임 락 ON/OFF',
      content: ['o', 'x'],
      description: '',
    },
    {
      title: '대시보드 내) 댓글 삭제',
      content: ['o', '△'],
      description: '클래식의 경우 내 댓글만 삭제 가능',
    },
    { title: '프로젝트 이름/설명 수정', content: ['o', 'x'], description: '' },
  ];

  return (
    isOpen && (
      <Modal size="md" modalKey={MODAL.LEVEL_INFO}>
        <Modal.Header title="권한별 제한 보기" />
        <Modal.Body className="gap-[8px]">
          <LevelTable>
            <LevelTableHead content={tableHeader} />
            {tableBody.map(({ title, content, description }, index) => (
              <LevelTableBody
                key={index}
                title={title}
                content={content}
                description={description}
              />
            ))}
          </LevelTable>
        </Modal.Body>
        <Modal.Footer className="mt-8 flex justify-end">
          <Button color="normal" onClick={() => closeModal(MODAL.LEVEL_INFO)}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
