import { create } from "zustand";
import {
  createUserSessionSlice,
  type UserSessionSlice,
} from "./user-session-slice";
import { persist } from "zustand/middleware";

// Combine other slices here.
// Example: AppStore = firstSlice & secondSlice & thirdSlice
type AppStore = UserSessionSlice;

export const useAppStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createUserSessionSlice(...a),
    }),
    {
      name: "app-store",
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    },
  ),
);
