export type ErrorCode = keyof typeof ERROR_MESSAGES;
export type ErrorCategory = keyof (typeof ERROR_MESSAGES)[ErrorCode];
export type ErrorMessage = (typeof ERROR_MESSAGES)[ErrorCode][ErrorCategory];

export interface SupabaseConfig {
  STORAGE_BUCKET: string;
  MAX_FILE_SIZE: number;
  SUPPORTED_IMAGE_TYPES: readonly string[];
  DEFAULT_QUERY_LIMIT: number;
  STORAGE: {
    CACHE_CONTROL: string;
    UPSERT: boolean;
  };
  AUTH: {
    SESSION_EXPIRY: number;
    REFRESH_THRESHOLD: number;
  };
}