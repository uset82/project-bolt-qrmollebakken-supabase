import { supabase } from '../supabase/client';
import type { User } from '../supabase/types';
import { ERROR_MESSAGES } from '../supabase/config';

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    if (!user) return null;

    return {
      id: user.id,
      email: user.email || '',
      role: user.user_metadata.role || 'parent',
      metadata: user.user_metadata
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function signInWithQR(qrData: string): Promise<User> {
  try {
    const [prefix, type, parentId] = qrData.split(':');
    
    if (prefix !== 'mollebakken' || type !== 'parent') {
      throw new Error('Invalid QR code format');
    }

    // For demo purposes, using a simplified auth flow
    const { data, error } = await supabase.auth.signInWithPassword({
      email: `parent-${parentId}@mollebakken.internal`,
      password: 'demo-password' // In production, use proper authentication
    });

    if (error) throw error;
    if (!data.user) throw new Error(ERROR_MESSAGES.AUTHENTICATION.INVALID_CREDENTIALS);

    return {
      id: data.user.id,
      email: data.user.email || '',
      role: 'parent',
      metadata: {
        parent_id: parentId
      }
    };
  } catch (error) {
    console.error('QR sign in error:', error);
    throw error;
  }
}