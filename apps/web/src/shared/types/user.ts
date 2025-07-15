export type User = {
  participantId: number;
  userRole: Role;
  userRoleDesc: string;
  userId: string;
  username: string;
  joinDt: string;
};

export type UserInfo = {
  userId: string;
  name: string;
  profileFileData: {
    fileId: number;
    fileGroupNo: number;
    fileOriNm: string;
    fileSysNm: string;
    url: string;
  };
};

export type Role = 'M' | 'C' | 'S';
