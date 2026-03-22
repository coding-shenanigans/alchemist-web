import type { StateCreator } from "zustand";
import type { UserSession } from "../types";

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
