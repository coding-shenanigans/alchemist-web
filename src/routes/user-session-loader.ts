import { refresh } from "../api/endpoints";

// Initial loading delay in milliseconds.
const MIN_LOAD_TIME_MS = 500;

export const userSessionLoader = async (): Promise<void> => {
  // Ensures that the splash screen is shown for a minimum duration, so the
  // app doesn't seem jumpy.
  const [{ error }] = await Promise.all([
    refresh(),
    new Promise((resolve) => setTimeout(resolve, MIN_LOAD_TIME_MS)),
  ]);

  if (error) {
    console.error("Failed to refresh user session.", error);
  }
};
