export const PATHS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    VERIFY_EMAIL: '/send-activation',
    RESET_PASSWORD: '/reset-password',
  },
  HOME: '/',
  POSTS: {
    NEWEST: '/newest',
    FOLLOWINGS: '/followings',
    DETAIL: '/p/:slug',
    PUBLISH: '/publish/post',
  },
  ADMIN: {
    BASE: '/admin',
    DASHBOARD: 'dashboard/index',
    USERS: 'user',
    USERS_CATALOGUE: 'catalogue',
    USERS_INDEX: 'index',
  },
  NOT_FOUND: '/404',
};
