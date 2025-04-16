export type User = {
  participantId: number;
  userRole: 'M' | 'C' | 'S';
  userRoleDesc: string;
  userId: string;
  username: string;
  joinDt: string;
};
