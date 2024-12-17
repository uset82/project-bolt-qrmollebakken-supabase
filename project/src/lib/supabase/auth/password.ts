import { supabase } from '../client';
import { ERROR_MESSAGES } from '../config';

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  } catch (error) {
    console.error('Password reset error:', error);
    throw new Error(ERROR_MESSAGES.AUTHENTICATION.RESET_PASSWORD_ERROR);
  }
}

export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
  } catch (error) {
    console.error('Password update error:', error);
    throw new Error(ERROR_MESSAGES.AUTHENTICATION.UPDATE_PASSWORD_ERROR);
  }
}