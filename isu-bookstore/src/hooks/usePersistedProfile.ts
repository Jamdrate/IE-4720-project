"use client";

import { useCallback, useEffect, useState } from "react";
import {
  loadProfileFromStorage,
  saveProfileToStorage,
  type StoredProfile,
} from "../lib/profile-storage";

export function usePersistedProfile() {
  const [profile, setProfile] = useState<StoredProfile>({
    displayName: "",
    email: "",
  });
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    setProfile(loadProfileFromStorage());
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) {
      return;
    }
    saveProfileToStorage(profile);
  }, [profile, storageReady]);

  const updateProfile = useCallback((partial: Partial<StoredProfile>) => {
    setProfile((prev) => ({ ...prev, ...partial }));
  }, []);

  return { profile, updateProfile, storageReady };
}
