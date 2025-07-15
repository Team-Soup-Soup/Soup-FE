import type { Role } from './user';

export type Project = {
  projectId: number;
  name: string;
  description: string;
  createBy: string;
  createAt: string;
  updateBy: string;
  updateAt: string;
  auth: Role;
};
