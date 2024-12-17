export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  metadata: Record<string, any>;
}

export type AuthProvider = 'google' | 'github' | 'azure';