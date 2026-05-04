export const PROFILE_STORAGE_KEY = "isu-bookstore-profile-v1";

export interface StoredProfile {
  displayName: string;
  email: string;
}

const defaultProfile: StoredProfile = {
  displayName: "",
  email: "",
};

export function loadProfileFromStorage(): StoredProfile {
  if (typeof window === "undefined") {
    return defaultProfile;
  }
  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) {
      return defaultProfile;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) {
      return defaultProfile;
    }
    const o = parsed as Record<string, unknown>;
    return {
      displayName: typeof o.displayName === "string" ? o.displayName : "",
      email: typeof o.email === "string" ? o.email : "",
    };
  } catch {
    return defaultProfile;
  }
}

export function saveProfileToStorage(profile: StoredProfile): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    /* ignore */
  }
}
