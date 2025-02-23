import { atom } from 'jotai';
import type { Modal } from '../types';
import { MODAL } from '../constants';

type ModalInfo = {
  [key in Modal]: { isOpen: boolean };
};

export const modalAtom = atom<ModalInfo>({
  [MODAL.CREATE_PROJECT]: {
    isOpen: false,
  },
});

export const updateModal = atom(
  null,
  (get, set, update: { key: Modal; isOpen: boolean }) => {
    const currentModal = get(modalAtom);
    const updatedModal = {
      ...currentModal,
      [update.key]: { isOpen: update.isOpen },
    };
    set(modalAtom, updatedModal);
  },
);
