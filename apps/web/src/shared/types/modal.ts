import { MODAL } from '../constants';

export type ModalItem = (typeof MODAL)[keyof typeof MODAL];
