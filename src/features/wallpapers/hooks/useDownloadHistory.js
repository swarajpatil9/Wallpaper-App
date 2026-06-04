import { useUser } from "@clerk/clerk-react";
import { useCallback, useEffect, useState } from "react";

const MAX_HISTORY = 20;

function getStorageKey(userId) {
  return `wallpaper-downloads-${userId}`;
}

function readFromStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function useDownloadHistory() {
  const { user } = useUser();
  const userId = user?.id;

  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!userId) return;
    setHistory(readFromStorage(getStorageKey(userId)));
  }, [userId]);

  const recordDownload = useCallback(
    (wallpaper) => {
      if (!userId || !wallpaper) return;
      const key = getStorageKey(userId);
      const existing = readFromStorage(key).filter(
        (d) => d.id !== wallpaper.id,
      );
      const next = [
        {
          id: wallpaper.id,
          alt: wallpaper.alt,
          photographer: wallpaper.photographer,
          src: { medium: wallpaper.src?.medium },
          width: wallpaper.width,
          height: wallpaper.height,
          downloadedAt: Date.now(),
        },
        ...existing,
      ].slice(0, MAX_HISTORY);
      localStorage.setItem(key, JSON.stringify(next));
      setHistory(next);
    },
    [userId],
  );

  const clearHistory = useCallback(() => {
    if (!userId) return;
    localStorage.removeItem(getStorageKey(userId));
    setHistory([]);
  }, [userId]);

  return { history, recordDownload, clearHistory };
}

export default useDownloadHistory;
