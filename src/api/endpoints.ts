import type {
  ApiResponse,
  CreateItemRequest,
  CreateItemResponse,
  CreateWishListRequest,
  CreateWishListResponse,
  ErrorResponse,
  GetUserProfileResponse,
  GetWishListResponse,
  ListItemsResponse,
  ListWishListsResponse,
  RefreshResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UpdateWishListRequest,
  UpdateWishListResponse,
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
 * @returns An ApiResponse object.
 */
export const refresh = async (): Promise<ApiResponse<RefreshResponse>> => {
  const { isAuthenticated, setUserSession } = useAppStore.getState();

  // Only refresh the user session if a user is authenticated.
  // This handles a scenario where a user signed out, but the signout API call
  // failed. Resulting in a refresh token existing after the user signed out.
  if (!isAuthenticated) {
    return { status: 401, error: new Error("The user is not authenticated.") };
  }

  const url = `${baseUrl}/auth/refresh`;
  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  const response = await sendRequest<RefreshResponse>(url, options, false);

  if (response.error) {
    signOut();
    return response;
  }

  if (response.data?.userSession) {
    setUserSession(response.data.userSession);
  }

  return response;
};

/**
 * Fetches a user's profile.
 * @param username The target username.
 * @returns An ApiResponse object.
 */
export const getUserProfile = async (
  username: string,
): Promise<ApiResponse<GetUserProfileResponse>> => {
  const { userSession } = useAppStore.getState();

  const url = `${baseUrl}/users/${username}/profile`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

      // This is a hybrid endpoint. Only include the Authorization header if a
      // user session exists.
      ...(userSession && {
        Authorization: `Bearer ${userSession.accessToken}`,
      }),
    },
    credentials: "include",
  };

  return await sendRequest<GetUserProfileResponse>(url, options, true);
};

/**
 * Creates a new wish list.
 * @param username The target username.
 * @param request The request object.
 * @returns An ApiResponse object.
 */
export const createWishList = async (
  username: string,
  request: CreateWishListRequest,
): Promise<ApiResponse<CreateWishListResponse>> => {
  const { userSession } = useAppStore.getState();

  const url = `${baseUrl}/users/${username}/wish-lists`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userSession?.accessToken}`,
    },
    body: JSON.stringify(request),
    credentials: "include",
  };

  return await sendRequest<CreateWishListResponse>(url, options, true);
};

/**
 * Updates a wish list.
 * @param username The target username.
 * @param wishListId The target wish list id.
 * @param request The request object.
 * @returns An ApiResponse object.
 */
export const updateWishList = async (
  username: string,
  wishListId: number,
  request: UpdateWishListRequest,
): Promise<ApiResponse<UpdateWishListResponse>> => {
  const { userSession } = useAppStore.getState();

  const url = `${baseUrl}/users/${username}/wish-lists/${wishListId}`;
  const options: RequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userSession?.accessToken}`,
    },
    body: JSON.stringify(request),
    credentials: "include",
  };

  return await sendRequest<UpdateWishListResponse>(url, options, true);
};

/**
 * Deletes a wish list.
 * @param username The target username.
 * @param wishListId The target wish list id.
 * @returns An ApiResponse object.
 */
export const deleteWishList = async (
  username: string,
  wishListId: number,
): Promise<ApiResponse<void>> => {
  const { userSession } = useAppStore.getState();

  const url = `${baseUrl}/users/${username}/wish-lists/${wishListId}`;
  const options: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userSession?.accessToken}`,
    },
    credentials: "include",
  };

  return await sendRequest<void>(url, options, true);
};

/**
 * Fetches a user's wish lists.
 * @param username The target username.
 * @returns An ApiResponse object.
 */
export const listWishLists = async (
  username: string,
): Promise<ApiResponse<ListWishListsResponse>> => {
  const { userSession } = useAppStore.getState();

  const url = `${baseUrl}/users/${username}/wish-lists`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

      // This is a hybrid endpoint. Only include the Authorization header if a
      // user session exists.
      ...(userSession && {
        Authorization: `Bearer ${userSession.accessToken}`,
      }),
    },
    credentials: "include",
  };

  return await sendRequest<ListWishListsResponse>(url, options, true);
};

/**
 * Fetches a wish list.
 * @param username The target username.
 * @param wishListId The target wish list id.
 * @returns An ApiResponse object.
 */
export const getWishList = async (
  username: string,
  wishListId: string,
): Promise<ApiResponse<GetWishListResponse>> => {
  const { userSession } = useAppStore.getState();

  const url = `${baseUrl}/users/${username}/wish-lists/${wishListId}`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

      // This is a hybrid endpoint. Only include the Authorization header if a
      // user session exists.
      ...(userSession && {
        Authorization: `Bearer ${userSession.accessToken}`,
      }),
    },
    credentials: "include",
  };

  return await sendRequest<GetWishListResponse>(url, options, true);
};

/**
 * Creates a new item.
 * @param username The target username.
 * @param wishListId The target wish list id.
 * @param request The request object.
 * @returns An ApiResponse object.
 */
export const createItem = async (
  username: string,
  wishListId: string,
  request: CreateItemRequest,
): Promise<ApiResponse<CreateItemResponse>> => {
  const { userSession } = useAppStore.getState();

  const url = `${baseUrl}/users/${username}/wish-lists/${wishListId}/items`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userSession?.accessToken}`,
    },
    body: JSON.stringify(request),
    credentials: "include",
  };

  return await sendRequest<CreateItemResponse>(url, options, true);
};

/**
 * Fetches a wish list's items.
 * @param username The target username.
 * @param wishListId The target wish list id.
 * @returns An ApiResponse object.
 */
export const listItems = async (
  username: string,
  wishListId: string,
): Promise<ApiResponse<ListItemsResponse>> => {
  const { userSession } = useAppStore.getState();

  const url = `${baseUrl}/users/${username}/wish-lists/${wishListId}/items`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

      // This is a hybrid endpoint. Only include the Authorization header if a
      // user session exists.
      ...(userSession && {
        Authorization: `Bearer ${userSession.accessToken}`,
      }),
    },
    credentials: "include",
  };

  return await sendRequest<ListItemsResponse>(url, options, true);
};
