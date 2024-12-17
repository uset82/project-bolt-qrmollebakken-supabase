import { supabase } from '../client';
import type { Student } from '../types';

export async function getStudents(): Promise<Student[]> {
  try {
    const { data, error } = await supabase
      .from('students')
      .select()
      .order('name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch students:', error);
    throw error;
  }
}

export async function getStudent(id: string): Promise<Student> {
  try {
    const { data, error } = await supabase
      .from('students')
      .select()
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Student not found');
    return data;
  } catch (error) {
    console.error('Failed to fetch student:', error);
    throw error;
  }
}