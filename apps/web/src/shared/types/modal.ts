import { MODAL } from '../constants';

export type Modal = (typeof MODAL)[keyof typeof MODAL];
