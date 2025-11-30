'use client';
import { Button } from '@/components/ui/Button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { DEFAULT_SIGNOUT_REDIRECT } from '@/lib/constants/routes.constants';

interface HeaderProps {
  userName?: string | null;
}

export function Header({ userName }: HeaderProps) {

  const handleSignOut = () => {
    signOut({ 
      callbackUrl: DEFAULT_SIGNOUT_REDIRECT,
    });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          </div>
          <div className="flex items-center space-x-4">
            {userName && (
              <span className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{userName}</span>
              </span>
            )}
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={handleSignOut}
              className="flex items-center space-x-2"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
