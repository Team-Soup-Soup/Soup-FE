import type { ProfileLevel } from '../types';

export const getKoreanLevel = (level: ProfileLevel) => {
  switch (level) {
    case 'master':
      return '마스터';
    case 'subMaster':
      return '서브 마스터';
    case 'classic':
      return '클래식';
    default:
      return '-';
  }
};
