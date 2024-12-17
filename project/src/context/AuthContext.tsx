import { createContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase/client';
import { User } from '../lib/supabase/types';
import { signIn as supabaseSignIn, signOut as supabaseSignOut } from '../lib/supabase/auth';
import { ensureAuthenticatedSession } from '../lib/supabase/auth/session';
import { ERROR_MESSAGES } from '../lib/supabase/config';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isTeacher: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
  isTeacher: false,
  isLoading: true
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session on mount
    ensureAuthenticatedSession()
      .then(session => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: session.user.user_metadata.role || 'parent',
            metadata: session.user.user_metadata
          });
        }
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          role: session.user.user_metadata.role || 'parent',
          metadata: session.user.user_metadata
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const user = await supabaseSignIn(email, password);
      setUser(user);
      toast.success('Welcome back!');
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error(ERROR_MESSAGES.AUTHENTICATION.INVALID_CREDENTIALS);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabaseSignOut();
      setUser(null);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      isTeacher: user?.role === 'teacher',
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}