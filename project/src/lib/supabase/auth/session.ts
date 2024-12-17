import { supabase } from '../client';
import { ERROR_MESSAGES } from '../config';

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Session error:', error);
    throw new Error(ERROR_MESSAGES.AUTHENTICATION.SESSION_EXPIRED);
  }
  
  return session;
}

export async function refreshSession() {
  const { data: { session }, error } = await supabase.auth.refreshSession();
  
  if (error) {
    console.error('Session refresh error:', error);
    throw new Error(ERROR_MESSAGES.AUTHENTICATION.SESSION_EXPIRED);
  }
  
  return session;
}

export async function ensureAuthenticatedSession() {
  const session = await getSession();
  
  if (!session) {
    throw new Error(ERROR_MESSAGES.AUTHENTICATION.NOT_AUTHENTICATED);
  }
  
  if (new Date(session.expires_at!) < new Date()) {
    return refreshSession();
  }
  
  return session;
}