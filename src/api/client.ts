import type { ApiResponse, ErrorResponse } from "../types";

/**
 * Sends a fetch request.
 * @param url The URL for the request.
 * @param options The request options.
 * @returns An ApiResponse object.
 */
export const sendRequest = async <T>(
  url: string,
  options: RequestInit,
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      const errorResponse = data as ErrorResponse;
      return {
        status: response.status,
        error: new Error(errorResponse.error.message),
      };
    }

    return { status: response.status, data };
  } catch (error) {
    console.error(`[API Error] ${options.method} ${url}`, error);

    return { status: 500, error: new Error("An unknown error occurred.") };
  }
};
