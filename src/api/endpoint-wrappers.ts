/**
 * This file contains wrapper functions for API calls. They simplify the
 * TanStack integration in React components.
 */

import type { GetUserProfileResponse, ListWishListsResponse } from "../types";
import { getUserProfile, listWishLists } from "./endpoints";

/**
 * Fetches a user's profile.
 *
 * This is a wrapper function for the getUserProfile API.
 * @param username The target username.
 * @returns The success response received from the API.
 * @throws {Error} If the request is not successful.
 */
export const getUserProfileQuery = async (
  username: string | undefined,
): Promise<GetUserProfileResponse> => {
  if (!username) {
    throw new Error("The username is required.");
  }

  const response = await getUserProfile(username);

  if (response.error) {
    throw response.error;
  }

  if (!response.data) {
    throw new Error("The response data is missing.");
  }

  return response.data;
};

/**
 * Fetches a user's wish lists.
 *
 * This is a wrapper function for the listWishLists API.
 * @param username The target username.
 * @returns The success response received from the API.
 * @throws {Error} If the request is not successful.
 */
export const listWishListsQuery = async (
  username: string | undefined,
): Promise<ListWishListsResponse> => {
  if (!username) {
    throw new Error("The username is required.");
  }

  const response = await listWishLists(username);

  if (response.error) {
    throw response.error;
  }

  if (!response.data) {
    throw new Error("The response data is missing.");
  }

  return response.data;
};
