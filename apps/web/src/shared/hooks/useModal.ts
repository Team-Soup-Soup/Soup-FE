import { useAtomValue, useSetAtom } from 'jotai';
import type { ModalItem } from '../types';
import { useCallback } from 'react';
import { modalAtom, updateModal } from '../atoms';

interface UseModalProps {
  key: ModalItem;
}

export function useModal() {
  const setModal = useSetAtom(updateModal);

  const openModal = useCallback(
    (key: ModalItem) => setModal({ key, isOpen: true }),
    [setModal],
  );
  const closeModal = useCallback(
    (key: ModalItem) => setModal({ key, isOpen: false }),
    [setModal],
  );

  return { openModal, closeModal };
}

export function useModalState({ key }: UseModalProps) {
  const modal = useAtomValue(modalAtom)[key] || { isOpen: false };
  return modal;
}

export function useModalKeyState() {
  const openModal = Object.entries(useAtomValue(modalAtom))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value.isOpen)
    .map(([key]) => key);
  return openModal;
}
