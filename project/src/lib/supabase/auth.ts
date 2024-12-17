import { supabase } from './client';
import { getParentAuthToken } from './database';

export interface User {
  id: string;
  email: string;
  role: 'parent' | 'teacher';
  metadata?: {
    parent_id?: string;
    student_id?: string;
  };
}

export async function signIn(email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  if (!data.user) throw new Error('No user data returned');

  return {
    id: data.user.id,
    email: data.user.email || '',
    role: data.user.user_metadata.role || 'parent',
    metadata: data.user.user_metadata
  };
}

export async function signInWithQR(qrData: string): Promise<User> {
  const [prefix, type, parentId] = qrData.split(':');
  
  if (prefix !== 'mollebakken' || type !== 'parent') {
    throw new Error('Invalid QR code format');
  }

  const authToken = await getParentAuthToken(parentId);
  if (!authToken || new Date(authToken.expires_at) < new Date()) {
    throw new Error('Invalid or expired QR code');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: `parent-${parentId}@mollebakken.internal`,
    password: authToken.token
  });

  if (error) throw error;
  if (!data.user) throw new Error('No user data returned');

  return {
    id: data.user.id,
    email: data.user.email || '',
    role: 'parent',
    metadata: {
      parent_id: parentId
    }
  };
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  return {
    id: user.id,
    email: user.email || '',
    role: user.user_metadata.role || 'parent',
    metadata: user.user_metadata
  };
}