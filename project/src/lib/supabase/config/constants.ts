export const SUPABASE_CONFIG = {
  STORAGE_BUCKET: 'artworks',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  DEFAULT_QUERY_LIMIT: 12,
  STORAGE: {
    CACHE_CONTROL: '3600',
    UPSERT: true, // Allow overwriting files
    PUBLIC_ACCESS: true // Files are publicly accessible
  },
  AUTH: {
    SESSION_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
    REFRESH_THRESHOLD: 5 * 60 * 1000 // 5 minutes
  }
} as const;