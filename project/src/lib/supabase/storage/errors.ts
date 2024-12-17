export class StorageError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'StorageError';
  }
}

export class StoragePermissionError extends StorageError {
  constructor(message: string) {
    super(message, 'PERMISSION_DENIED');
    this.name = 'StoragePermissionError';
  }
}

export class StorageQuotaError extends StorageError {
  constructor(message: string) {
    super(message, 'QUOTA_EXCEEDED');
    this.name = 'StorageQuotaError';
  }
}