import { auth } from '@/lib/auth';

export default auth(() => {
  // Middleware logic can be added here if needed
  return;
});

export const config = {
  matcher: [`/dashboard/:path*`],
};
