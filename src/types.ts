export interface ApiResponse<T> {
  status: number;
  data?: T;
  error?: Error;
}

export interface UserSession {
  email: string;
  username: string;
  accessToken: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  userSession: UserSession;
}

export interface ErrorInfo {
  code: number;
  message: string;
}

export interface ErrorResponse {
  error: ErrorInfo;
}
