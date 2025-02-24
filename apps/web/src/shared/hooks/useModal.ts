import { useAtomValue, useSetAtom } from 'jotai';
import type { Modal } from '../types';
import { useCallback } from 'react';
import { modalAtom, updateModal } from '../atoms';

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
  const modal = useAtomValue(modalAtom)[key] || { isOpen: false };
  return modal;
}
