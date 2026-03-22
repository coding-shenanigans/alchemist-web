import { create } from "zustand";
import {
  createUserSessionSlice,
  type UserSessionSlice,
} from "./user-session-slice";

// Combine other slices here.
// Example: AppStore = firstSlice & secondSlice & thirdSlice
type AppStore = UserSessionSlice;

export const useAppStore = create<AppStore>()((...a) => ({
  ...createUserSessionSlice(...a),
}));
