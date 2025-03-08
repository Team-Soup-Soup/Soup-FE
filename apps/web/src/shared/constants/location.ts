export const LOCATION = new Proxy<Record<string, string>>(
  {
    project: '메인보드',
    board: '게시판',
    search: '게시글 검색',
  },
  {
    get(target, prop: string) {
      return isNaN(Number(prop)) ? target[prop] : '게시글';
    },
  },
);
