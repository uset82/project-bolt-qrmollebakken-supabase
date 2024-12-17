import { supabase } from '../client';
import type { User } from '../types';
import { ERROR_MESSAGES } from '../config';

export async function checkAuth() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Auth check error:', error);
    throw new Error(ERROR_MESSAGES.AUTHENTICATION.NOT_AUTHENTICATED);
  }
  
  if (!session) {
    throw new Error(ERROR_MESSAGES.AUTHENTICATION.NOT_AUTHENTICATED);
  }
  
  return session;
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    await checkAuth();
    return true;
  } catch {
    return false;
  }
}

export async function signIn(email: string, password: string): Promise<User> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (!data.user) throw new Error(ERROR_MESSAGES.AUTHENTICATION.INVALID_CREDENTIALS);

    return {
      id: data.user.id,
      email: data.user.email || '',
      role: data.user.user_metadata.role || 'parent',
      metadata: data.user.user_metadata
    };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}