import type {
  ApiResponse,
  ErrorResponse,
  RefreshResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "../types";
import { useAppStore } from "../zustand/store";

// TODO: Fetch backend url from env or constants file.
const baseUrl = "http://localhost:9000";

let refreshPromise: Promise<ApiResponse<RefreshResponse>> | null = null;

/**
 * Sends a fetch request.
 * @param url The URL for the request.
 * @param options The request options.
 * @param retry Whether unauthenticated errors should be retried.
 * @returns An ApiResponse object.
 */
const sendRequest = async <T>(
  url: string,
  options: RequestInit,
  retry: boolean,
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, options);

    // Handle success responses without a body (204 No Content).
    const data = response.status === 204 ? {} : await response.json();

    if (response.ok) {
      return { status: response.status, data };
    }

    if (response.status === 401 && retry) {
      return await refreshAndRetry<T>(url, options);
    }

    const errorResponse = data as ErrorResponse;
    return {
      status: response.status,
      error: new Error(errorResponse.error.message),
    };
  } catch (error) {
    console.error(`[API Error] ${options.method} ${url}`, error);

    return { status: 500, error: new Error("An unknown error occurred.") };
  }
};

/**
 * Retries a request after refreshing the user session.
 * @param url The URL for the request.
 * @param options The request options.
 * @returns An ApiResponse object.
 */
const refreshAndRetry = async <T>(
  url: string,
  options: RequestInit,
): Promise<ApiResponse<T>> => {
  const { error } = await getRefreshPromise();

  if (error) {
    signOut();
    return { status: 401, error: new Error("The user session expired.") };
  }

  const { userSession } = useAppStore.getState();
  const newOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${userSession?.accessToken}`,
    },
  };

  return await sendRequest<T>(url, newOptions, false);
};

/**
 * Gets a promise singleton containing the response from the refresh request.
 *
 * This ensures that there's only one active refresh request at a time.
 * @returns An ApiResponse object.
 */
const getRefreshPromise = async (): Promise<ApiResponse<RefreshResponse>> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = refresh();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
};

/**
 * Starts a user session.
 * @param request The request object.
 * @returns An ApiResponse object.
 */
export const signIn = async (
  request: SignInRequest,
): Promise<ApiResponse<SignInResponse>> => {
  const { setUserSession } = useAppStore.getState();

  const url = `${baseUrl}/auth/signin`;
  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    credentials: "include",
  };

  const response = await sendRequest<SignInResponse>(url, options, false);

  if (response.data?.userSession) {
    setUserSession(response.data.userSession);
  }

  return response;
};

/**
 * Starts a user session.
 * @param request The request object.
 * @returns An ApiResponse object.
 */
export const signUp = async (
  request: SignUpRequest,
): Promise<ApiResponse<SignUpResponse>> => {
  const { setUserSession } = useAppStore.getState();

  const url = `${baseUrl}/auth/signup`;
  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    credentials: "include",
  };

  const response = await sendRequest<SignUpResponse>(url, options, false);

  if (response.data?.userSession) {
    setUserSession(response.data.userSession);
  }

  return response;
};

/**
 * Ends a user session.
 *
 * The user session is ended without waiting for a response from the API.
 */
export const signOut = (): void => {
  const { clearUserSession, userSession } = useAppStore.getState();

  const url = `${baseUrl}/auth/signout`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userSession?.accessToken}`,
    },
    credentials: "include",
    keepalive: true,
  };

  clearUserSession();
  sendRequest<void>(url, options, false);
};

/**
 * Refreshes a user session.
 * @param request The request object.
 * @returns An ApiResponse object.
 */
export const refresh = async (): Promise<ApiResponse<RefreshResponse>> => {
  const { setUserSession } = useAppStore.getState();

  const url = `${baseUrl}/auth/refresh`;
  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  const response = await sendRequest<RefreshResponse>(url, options, false);

  if (response.data?.userSession) {
    setUserSession(response.data.userSession);
  }

  return response;
};
