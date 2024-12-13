export interface User {
  token: string;
  id: string
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}