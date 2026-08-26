const HISTORY_KEY = "manit_tube_history";

export function getHistory() {
  try {
    const stored = localStorage.getItem(
      HISTORY_KEY
    );

    if (!stored) return [];

    return JSON.parse(stored);
  } catch (error) {
    console.error(
      "Failed to read history:",
      error
    );

    return [];
  }
}

export function addToHistory(video) {
  if (!video?._id) return;

  try {
    const history = getHistory();

    const filtered = history.filter(
      (item) => item._id !== video._id
    );

    const updated = [
      {
        ...video,
        watchedAt: new Date().toISOString(),
      },
      ...filtered,
    ].slice(0, 50);

    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(updated)
    );
  } catch (error) {
    console.error(
      "Failed to save history:",
      error
    );
  }
}

export function removeFromHistory(videoId) {
  const history = getHistory();

  const updated = history.filter(
    (item) => item._id !== videoId
  );

  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(updated)
  );
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}