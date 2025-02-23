import { useAtomValue, useSetAtom } from 'jotai';
import { modalAtom, updateModal } from '../atoms/modal';
import type { Modal } from '../types';
import { useCallback } from 'react';

interface UseModalProps {
  key: Modal;
}

export function useModal({ key }: UseModalProps) {
  const setModal = useSetAtom(updateModal);

  const openModal = useCallback(
    () => setModal({ key, isOpen: true }),
    [key, setModal],
  );
  const closeModal = useCallback(
    () => setModal({ key, isOpen: false }),
    [key, setModal],
  );

  return { openModal, closeModal };
}

export function useModalState({ key }: UseModalProps) {
  return useAtomValue(modalAtom)[key];
}
