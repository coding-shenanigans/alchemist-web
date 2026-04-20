import type {
  ApiResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "../types";
import { useAppStore } from "../zustand/store";
import { sendRequest } from "./client";

// TODO: Fetch backend url from env or constants file.
const baseUrl = "http://localhost:9000";

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

  const response = await sendRequest<SignInResponse>(url, options);

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

  const response = await sendRequest<SignUpResponse>(url, options);

  if (response.data?.userSession) {
    setUserSession(response.data.userSession);
  }

  return response;
};

/**
 * Ends a user session.
 *
 * The user session is ended without waiting for a response from the sign out
 * API call.
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
  sendRequest<void>(url, options);
};
