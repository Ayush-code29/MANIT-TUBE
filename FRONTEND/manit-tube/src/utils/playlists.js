const PLAYLIST_KEY = "manit_tube_playlist";

export function getSavedVideos() {
  try {
    const stored =
      localStorage.getItem(PLAYLIST_KEY);

    if (!stored) return [];

    return JSON.parse(stored);
  } catch (error) {
    console.error(
      "Failed to load saved videos:",
      error
    );

    return [];
  }
}

export function isVideoSaved(videoId) {
  return getSavedVideos().some(
    (video) => video._id === videoId
  );
}

export function toggleSavedVideo(video) {
  if (!video?._id) return [];

  const current = getSavedVideos();

  const exists = current.some(
    (item) => item._id === video._id
  );

  const updated = exists
    ? current.filter(
        (item) => item._id !== video._id
      )
    : [video, ...current];

  localStorage.setItem(
    PLAYLIST_KEY,
    JSON.stringify(updated)
  );

  return updated;
}

export function clearSavedVideos() {
  localStorage.removeItem(PLAYLIST_KEY);
}