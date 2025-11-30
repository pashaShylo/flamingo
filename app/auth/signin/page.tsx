import SignInPage from '@/views/SignInPage';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { DEFAULT_SIGNIN_REDIRECT } from '@/lib/constants/routes.constants';

export default async function SignIn() {
  const session = await auth();

  if (session?.user?.id) {
    redirect(DEFAULT_SIGNIN_REDIRECT);
  }

  return <SignInPage />;
}