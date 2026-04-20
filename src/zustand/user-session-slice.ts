import type { StateCreator } from "zustand";
import type { UserSession } from "../types";

export interface UserSessionSlice {
  userSession: UserSession | null;
  isAuthenticated: boolean;
  setUserSession: (userSession: UserSession) => void;
  clearUserSession: () => void;
}

export const createUserSessionSlice: StateCreator<UserSessionSlice> = (
  set,
) => ({
  userSession: null,
  isAuthenticated: false,
  setUserSession: (userSession) => set({ userSession, isAuthenticated: true }),
  clearUserSession: () => set({ userSession: null, isAuthenticated: false }),
});
