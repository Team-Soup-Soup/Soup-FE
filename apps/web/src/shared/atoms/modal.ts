import { atom } from 'jotai';
import type { Modal } from '../types';
import { MODAL } from '../constants';

type ModalInfo = {
  [key in Modal]: { isOpen: boolean };
};

const modals = Object.keys(MODAL).reduce((acc, key) => {
  acc[key as Modal] = { isOpen: false };
  return acc;
}, {} as ModalInfo);

export const modalAtom = atom<ModalInfo>(modals);

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
