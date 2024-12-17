// Supabase configuration constants
export const SUPABASE_CONFIG = {
  STORAGE_BUCKET: 'artworks',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  DEFAULT_QUERY_LIMIT: 12,
  STORAGE: {
    CACHE_CONTROL: '3600',
    UPSERT: false
  }
} as const;

// Error messages
export const ERROR_MESSAGES = {
  AUTHENTICATION: {
    NOT_AUTHENTICATED: 'You must be authenticated to perform this action',
    INVALID_CREDENTIALS: 'Invalid email or password',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again'
  },
  STORAGE: {
    ACCESS_DENIED: 'Storage access denied. Please check your permissions.',
    UPLOAD_FAILED: 'Failed to upload file. Please try again.',
    FILE_TOO_LARGE: 'File size exceeds 10MB limit',
    INVALID_FILE_TYPE: 'Invalid file type. Only JPEG, PNG and GIF are supported',
    BUCKET_NOT_FOUND: 'Storage bucket not found',
    PERMISSION_ERROR: 'You do not have permission to perform this action'
  },
  DATABASE: {
    FETCH_ERROR: 'Failed to fetch data',
    NOT_FOUND: 'Resource not found',
    CREATE_ERROR: 'Failed to create resource',
    UPDATE_ERROR: 'Failed to update resource',
    DELETE_ERROR: 'Failed to delete resource'
  }
} as const;