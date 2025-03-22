import { PROFILE_LEVEL } from '../constants/profile';

export type ProfileLevel = (typeof PROFILE_LEVEL)[keyof typeof PROFILE_LEVEL];

export interface ProfileItem {
  name: string;
  profile?: string;
  level: ProfileLevel;
  connecting: string;
}

export type UserOptionItem = {
  name: string;
  image?: string;
};
