import type { StateCreator } from "zustand";

export interface UserSession {
  email: string;
  username: string;
  accessToken: string;
}

export interface UserSessionSlice {
  userSession: UserSession | null;
  setUserSession: (userSession: UserSession) => void;
  clearUserSession: () => void;
}

export const createUserSessionSlice: StateCreator<UserSessionSlice> = (
  set,
) => ({
  userSession: null,
  setUserSession: (userSession) => set({ userSession }),
  clearUserSession: () => set({ userSession: null }),
});
