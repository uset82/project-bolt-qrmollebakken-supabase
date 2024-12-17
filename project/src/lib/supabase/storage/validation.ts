import { STORAGE_CONFIG } from './config';
import { ERROR_MESSAGES } from '../config';

export function validateFileType(file: File): boolean {
  return STORAGE_CONFIG.SUPPORTED_IMAGE_TYPES.includes(file.type);
}

export function validateFileSize(file: File): boolean {
  return file.size <= STORAGE_CONFIG.MAX_FILE_SIZE;
}

export function validateFileName(fileName: string): boolean {
  return /^[a-zA-Z0-9-_\.]+$/.test(fileName);
}

export function validateUploadRequest(file: File) {
  if (!validateFileType(file)) {
    throw new Error(ERROR_MESSAGES.STORAGE.INVALID_FILE_TYPE);
  }

  if (!validateFileSize(file)) {
    throw new Error(ERROR_MESSAGES.STORAGE.FILE_TOO_LARGE);
  }

  if (!validateFileName(file.name)) {
    throw new Error(ERROR_MESSAGES.STORAGE.INVALID_FILENAME);
  }
}