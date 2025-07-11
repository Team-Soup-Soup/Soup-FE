export type User = {
  participantId: number;
  userRole: 'M' | 'C' | 'S';
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
