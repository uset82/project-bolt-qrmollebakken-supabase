export const ERROR_MESSAGES = {
  AUTHENTICATION: {
    NOT_AUTHENTICATED: 'You must be authenticated to perform this action',
    INVALID_CREDENTIALS: 'Invalid email or password',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again',
    PROVIDER_ERROR: 'Failed to sign in with provider',
    RESET_PASSWORD_ERROR: 'Failed to reset password',
    UPDATE_PASSWORD_ERROR: 'Failed to update password'
  },
  STORAGE: {
    ACCESS_DENIED: 'Storage access denied. Please check your permissions.',
    UPLOAD_FAILED: 'Failed to upload file. Please try again.',
    FILE_TOO_LARGE: 'File size exceeds 10MB limit',
    INVALID_FILE_TYPE: 'Invalid file type. Only JPEG, PNG and GIF are supported',
    BUCKET_NOT_FOUND: 'Storage bucket not found',
    PERMISSION_ERROR: 'You do not have permission to perform this action',
    INVALID_FILENAME: 'Invalid file name. Only alphanumeric characters, hyphens and underscores are allowed.',
    QUOTA_EXCEEDED: 'Storage quota exceeded'
  },
  DATABASE: {
    FETCH_ERROR: 'Failed to fetch data',
    NOT_FOUND: 'Resource not found',
    CREATE_ERROR: 'Failed to create resource',
    UPDATE_ERROR: 'Failed to update resource',
    DELETE_ERROR: 'Failed to delete resource'
  }
} as const;