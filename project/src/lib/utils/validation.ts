import { SUPABASE_CONFIG } from '../supabase/config';

export function validateFileType(file: File): boolean {
  return SUPABASE_CONFIG.SUPPORTED_IMAGE_TYPES.includes(file.type);
}

export function validateFileSize(file: File): boolean {
  return file.size <= SUPABASE_CONFIG.MAX_FILE_SIZE;
}

export function validateFileName(fileName: string): boolean {
  return /^[a-zA-Z0-9-_\.]+$/.test(fileName);
}

export function validateUploadRequest(file: File) {
  if (!validateFileType(file)) {
    throw new Error('Invalid file type. Only JPEG, PNG and GIF are supported');
  }

  if (!validateFileSize(file)) {
    throw new Error('File size exceeds 10MB limit');
  }

  if (!validateFileName(file.name)) {
    throw new Error('Invalid file name. Only alphanumeric characters, hyphens and underscores are allowed.');
  }
}