import { Paths } from 'expo-file-system';
import { useState } from 'react';

type Storage = { free: number; total: number } | null;

function readStorage(): Storage {
  try {
    const free = Paths.availableDiskSpace;
    const total = Paths.totalDiskSpace;
    return total > 0 ? { free, total } : null;
  } catch {
    // Not available on every platform (e.g. web).
    return null;
  }
}

/** Free and total device storage in bytes, or null if unavailable. */
export function useStorage() {
  const [storage, setStorage] = useState<Storage>(readStorage);
  return { storage, refresh: () => setStorage(readStorage()) };
}
