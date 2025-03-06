export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FIND_ID: '/help-id',
  FIND_PW: '/help-pw',
  PROJECT: '/project',
  PROJECT_CONTENT: '/project/:projectId',
  BOARD: '/project/:projectId/board',
  BOARD_CONTENT: '/board',
  POST_DETAIL: '/project/:projectId/board/:postId',
} as const;
