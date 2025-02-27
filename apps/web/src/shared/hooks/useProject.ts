import { useAtomValue, useSetAtom } from 'jotai';
import { projectAtom, updateProject } from '../atoms';
import { useCallback } from 'react';

export function useProject() {
  const setProject = useSetAtom(updateProject);

  const changeProject = useCallback(
    (name: string) => setProject({ name }),
    [setProject],
  );

  return { changeProject };
}

export function useProjectState() {
  const project = useAtomValue(projectAtom);
  return project;
}
