import { supabase } from './client';
import type { Student, Artwork, ParentAuthToken } from './types';

export async function getStudents(): Promise<Student[]> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function getArtworksByStudent(studentId: string): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getArtworksByParent(parentId: string): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .eq('parent_id', parentId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getParentAuthToken(parentId: string): Promise<ParentAuthToken | null> {
  const { data, error } = await supabase
    .from('parent_auth_tokens')
    .select('*')
    .eq('parent_id', parentId)
    .single();

  if (error) return null;
  return data;
}

export async function createArtwork(artwork: Omit<Artwork, 'id' | 'created_at'>): Promise<Artwork> {
  const { data, error } = await supabase
    .from('artworks')
    .insert([artwork])
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error('Failed to create artwork');
  
  return data;
}