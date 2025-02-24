import { atom } from 'jotai';

export const projectAtom = atom<string | null>(null);

export const updateProject = atom(
  null,
  (get, set, update: { name: string }) => {
    set(projectAtom, update.name);
  },
);
