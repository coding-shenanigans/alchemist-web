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

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  userSession: UserSession;
}

export interface RefreshResponse {
  userSession: UserSession;
}

export interface GetUserProfileResponse {
  username: string;
}

export interface WishList {
  id: number;
  userId: number;
  name: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  id: number;
  wishListId: number;
  url: string;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWishListRequest {
  wishList: {
    name: string;
    visibility: string;
  };
}

export interface CreateWishListResponse {
  wishList: WishList;
}

export interface UpdateWishListRequest {
  name: string;
  visibility: string;
}

export interface UpdateWishListResponse {
  wishList: WishList;
}

export interface ListWishListsResponse {
  wishLists: WishList[];
}

export interface ErrorInfo {
  code: number;
  message: string;
}

export interface ErrorResponse {
  error: ErrorInfo;
}
