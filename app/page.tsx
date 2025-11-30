import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { DEFAULT_SIGNIN_REDIRECT, DEFAULT_SIGNOUT_REDIRECT } from '@/lib/constants/routes.constants';

export default async function Home() {
  const session = await auth();
  
  if (session) {
    redirect(DEFAULT_SIGNIN_REDIRECT);
  } else {
    redirect(DEFAULT_SIGNOUT_REDIRECT);
  }
}
