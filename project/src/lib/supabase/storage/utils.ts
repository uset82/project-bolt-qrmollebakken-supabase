import { supabase } from '../client';
import { SUPABASE_CONFIG } from '../config';

export function validateFileType(file: File): boolean {
  return SUPABASE_CONFIG.SUPPORTED_IMAGE_TYPES.includes(file.type);
}

export function validateFileSize(file: File): boolean {
  return file.size <= SUPABASE_CONFIG.MAX_FILE_SIZE;
}

export function getPublicUrl(path: string): string {
  const { data: { publicUrl } } = supabase.storage
    .from(SUPABASE_CONFIG.STORAGE_BUCKET)
    .getPublicUrl(path);
  return publicUrl;
}