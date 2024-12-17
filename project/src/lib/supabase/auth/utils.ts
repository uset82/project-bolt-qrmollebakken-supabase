import { supabase } from '../client';
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