/**
 * This file contains wrapper functions for API calls. They simplify the
 * TanStack integration in React components.
 */

import type {
  GetUserProfileResponse,
  GetWishListResponse,
  ListItemsResponse,
  ListWishListsResponse,
} from "../types";
import {
  getUserProfile,
  getWishList,
  listItems,
  listWishLists,
} from "./endpoints";

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

/**
 * Fetches a wish list.
 *
 * This is a wrapper function for the getWishList API.
 * @param username The target username.
 * @param wishListId The target wish list id.
 * @returns The success response received from the API.
 * @throws {Error} If the request is not successful.
 */
export const getWishListQuery = async (
  username: string | undefined,
  wishListId: string | undefined,
): Promise<GetWishListResponse> => {
  if (!username) {
    throw new Error("The username is required.");
  }

  if (!wishListId) {
    throw new Error("The wish list id is required.");
  }

  const response = await getWishList(username, wishListId);

  if (response.error) {
    throw response.error;
  }

  if (!response.data) {
    throw new Error("The response data is missing.");
  }

  return response.data;
};

/**
 * Fetches a wish list's items.
 *
 * This is a wrapper function for the listItems API.
 * @param username The target username.
 * @param wishListId The target wish list id.
 * @returns The success response received from the API.
 * @throws {Error} If the request is not successful.
 */
export const listItemsQuery = async (
  username: string | undefined,
  wishListId: string | undefined,
): Promise<ListItemsResponse> => {
  if (!username) {
    throw new Error("The username is required.");
  }

  if (!wishListId) {
    throw new Error("The wish list id is required.");
  }

  const response = await listItems(username, wishListId);

  if (response.error) {
    throw response.error;
  }

  if (!response.data) {
    throw new Error("The response data is missing.");
  }

  return response.data;
};
