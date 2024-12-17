import { SUPABASE_CONFIG } from '../config';

export const STORAGE_CONFIG = {
  ...SUPABASE_CONFIG,
  POLICIES: {
    INSERT: 'INSERT',
    SELECT: 'SELECT',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
  },
  MIME_TYPES: {
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    GIF: 'image/gif'
  }
} as const;

export const STORAGE_PATHS = {
  getStudentPath: (studentId: string) => `${studentId}`,
  getArtworkPath: (studentId: string, fileName: string) => `${studentId}/${fileName}`
} as const;