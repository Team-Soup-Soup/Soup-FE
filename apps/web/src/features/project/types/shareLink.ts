export type ShareLink = {
  linkId: number;
  linkTitle: string;
  link: string;
  files: {
    fileId: number;
    fileGroupNo: number;
    fileOriNm: string;
    fileSysNm: string;
    url: string;
  };
};
