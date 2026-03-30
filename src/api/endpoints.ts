import axios from "axios";
import type {
  ApiResponse,
  ErrorResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "../types";
import client from "./client";
import { useAppStore } from "../zustand/store";

const { setUserSession } = useAppStore.getState();

/**
 * Starts a user session.
 * @param request The request object.
 * @returns An API response object.
 */
export const signIn = async (
  request: SignInRequest,
): Promise<ApiResponse<SignInResponse>> => {
  try {
    const response = await client.post<SignInResponse>("/auth/signin", request);
    setUserSession(response.data.userSession);

    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError<ErrorResponse>(error) && error.response) {
      return {
        status: error.response.data.error.code,
        error: new Error(error.response.data.error.message),
      };
    }

    return { status: 500, error: new Error("An unknown error occurred") };
  }
};

/**
 * Starts a user session.
 * @param request The request object.
 * @returns An API response object.
 */
export const signUp = async (
  request: SignUpRequest,
): Promise<ApiResponse<SignUpResponse>> => {
  try {
    const response = await client.post<SignUpResponse>("/auth/signup", request);
    setUserSession(response.data.userSession);

    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError<ErrorResponse>(error) && error.response) {
      return {
        status: error.response.data.error.code,
        error: new Error(error.response.data.error.message),
      };
    }

    return { status: 500, error: new Error("An unknown error occurred") };
  }
};
