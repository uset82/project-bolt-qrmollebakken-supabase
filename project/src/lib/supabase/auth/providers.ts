import { supabase } from '../client';
import { ERROR_MESSAGES } from '../config';
import type { AuthProvider } from '../types';

export async function signInWithProvider(provider: AuthProvider) {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Provider sign in error:', error);
    throw new Error(ERROR_MESSAGES.AUTHENTICATION.PROVIDER_ERROR);
  }
}