export const CLIENT_ROUTES = {
  HOME: '/',
  SIGN_IN: '/auth/signin',
  DASHBOARD: '/dashboard',
} as const;

export const API_ROUTES = {
  AUTH_CALLBACK_GOOGLE: '/api/auth/callback/google',
  AUTH_SIGNOUT: '/api/auth/signout',
  TASKS: '/api/tasks',
  TASK: (id: string) => `/api/tasks/${id}`,
} as const;

export const ROUTES = {
  ...CLIENT_ROUTES,
  ...API_ROUTES,
} as const;

export const DEFAULT_SIGNIN_REDIRECT = ROUTES.DASHBOARD;

export const DEFAULT_SIGNOUT_REDIRECT = CLIENT_ROUTES.SIGN_IN;
